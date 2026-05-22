// supabase/functions/send-booking-reminders/index.ts
//
// Fires every ~10 minutes via pg_cron (see
// supabase/migrations/2026-05-22_booking_reminder_cron.sql).
//
// Finds all bookings where:
//   - remind_email = true
//   - notification_sent_at IS NULL
//   - status != 'cancelled'
//   - starts_at is between now() and now() + 60 minutes
//
// For each, looks up the user's e-mail from public.profiles (populated by
// the on_auth_user_created trigger) and sends a bilingual reminder via
// mail.zoner.fi (SMTP). Once sent, stamps notification_sent_at = now() so
// the same row never gets a second e-mail.
//
// Environment variables (set via `supabase secrets set ...`):
//   SUPABASE_URL              (auto-injected by the runtime)
//   SUPABASE_SERVICE_ROLE_KEY (auto-injected by the runtime)
//   SMTP_HOST                 e.g. mail.zoner.fi
//   SMTP_PORT                 e.g. 465  (SSL) or 587 (STARTTLS)
//   SMTP_USER                 e.g. noreply@lutakko.info
//   SMTP_PASS                 mailbox password
//   SMTP_FROM                 e.g. 'Lutakko.info <noreply@lutakko.info>'
//   CRON_SECRET               long random string; pg_cron sends it in
//                              Authorization: Bearer <CRON_SECRET>
//
// Manual trigger (from the dev machine):
//   curl -X POST \
//        -H "Authorization: Bearer $CRON_SECRET" \
//        "https://<project-ref>.supabase.co/functions/v1/send-booking-reminders"

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { SMTPClient }   from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const SUPABASE_URL          = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SMTP_HOST             = Deno.env.get('SMTP_HOST')!;
const SMTP_PORT             = Number(Deno.env.get('SMTP_PORT') ?? '465');
const SMTP_USER             = Deno.env.get('SMTP_USER')!;
const SMTP_PASS             = Deno.env.get('SMTP_PASS')!;
const SMTP_FROM             = Deno.env.get('SMTP_FROM') ?? 'Lutakko.info <noreply@lutakko.info>';
const CRON_SECRET           = Deno.env.get('CRON_SECRET') ?? '';

interface BookingRow {
  id: string;
  user_id: string;
  kind: 'activity' | 'sauna' | 'event';
  item_key: string;
  starts_at: string;
  ends_at: string;
  party_size: number;
  notes: string | null;
  title: string | null;
}

interface ProfileRow {
  id: string;
  email: string | null;
  full_name: string | null;
  preferred_lang: 'fi' | 'en' | null;
}

Deno.serve(async (req) => {
  /* ---- auth: only pg_cron / manual curl with CRON_SECRET may run ---- */
  if (CRON_SECRET) {
    const auth = req.headers.get('Authorization') ?? '';
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  /* ---- find due reminders ---- */
  const nowIso     = new Date().toISOString();
  const horizonIso = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('id, user_id, kind, item_key, starts_at, ends_at, party_size, notes, title')
    .eq('remind_email', true)
    .is('notification_sent_at', null)
    .neq('status', 'cancelled')
    .gte('starts_at', nowIso)
    .lte('starts_at', horizonIso)
    .order('starts_at', { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!bookings || bookings.length === 0) {
    return new Response(JSON.stringify({ ok: true, found: 0, sent: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /* ---- pull e-mails + preferred language in one query ---- */
  const userIds = [...new Set(bookings.map((b) => b.user_id))];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, full_name, preferred_lang')
    .in('id', userIds);

  const profileById = new Map<string, ProfileRow>();
  (profiles ?? []).forEach((p) => profileById.set(p.id, p as ProfileRow));

  /* ---- open SMTP once ---- */
  const smtp = new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      tls: SMTP_PORT === 465, // 465 = implicit SSL; 587 = STARTTLS handled by client
      auth: { username: SMTP_USER, password: SMTP_PASS },
    },
  });

  let sent = 0;
  const failures: Array<{ id: string; reason: string }> = [];

  for (const b of bookings as BookingRow[]) {
    const profile = profileById.get(b.user_id);
    const email   = profile?.email;
    if (!email) {
      failures.push({ id: b.id, reason: 'no profile email' });
      continue;
    }

    const lang   = profile?.preferred_lang ?? 'fi';
    const titled = b.title?.trim() || labelForItem(b.kind, b.item_key, lang);
    const startsLocal = formatHelsinki(b.starts_at, lang);
    const endsLocal   = formatHelsinki(b.ends_at, lang, true);

    try {
      await smtp.send({
        from:    SMTP_FROM,
        to:      email,
        subject: lang === 'fi'
          ? `Muistutus: ${titled} alkaa tunnin kuluttua`
          : `Reminder: ${titled} starts in one hour`,
        content: 'auto',
        html: buildHtml({
          name:         profile?.full_name ?? null,
          title:        titled,
          startsLocal,
          endsLocal,
          partySize:    b.party_size,
          notes:        b.notes,
          lang,
        }),
      });

      /* mark sent */
      await supabase
        .from('bookings')
        .update({ notification_sent_at: new Date().toISOString() })
        .eq('id', b.id);

      sent += 1;
    } catch (e) {
      failures.push({ id: b.id, reason: String(e) });
    }
  }

  await smtp.close();

  return new Response(
    JSON.stringify({ ok: true, found: bookings.length, sent, failures }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
});

/* ------------------------------------------------------------------ */
/*  helpers                                                            */
/* ------------------------------------------------------------------ */

function labelForItem(kind: string, key: string, lang: 'fi' | 'en'): string {
  // Mirrors the catalog in data/dashboard.ts so reminder e-mails read
  // naturally. Custom calendar entries fall through to a sensible default.
  const FI: Record<string, string> = {
    'beach-volley':            'Beach Volley -kenttä',
    'outdoor-gym':             'Ulkokuntosali',
    'marina-berth':            'Vierasvenepaikka',
    'kayak-rental':            'Kajakkivuokra',
    'picnic-spot':             'Piknik-paikka',
    'saunalautta':             'Saunalautta',
    'sauna-viilu-private':     'Saunaravintola Sataman Viilu — privaatti',
    'sauna-viilu-public':      'Sataman Viilu — julkinen vuoro',
    'sauna-lakefront':         'Rantasauna',
    'custom-event':            'Kalenterimerkintä',
  };
  const EN: Record<string, string> = {
    'beach-volley':            'Beach volleyball court',
    'outdoor-gym':             'Outdoor gym',
    'marina-berth':            'Guest marina berth',
    'kayak-rental':            'Kayak rental',
    'picnic-spot':             'Picnic spot',
    'saunalautta':             'Sauna raft',
    'sauna-viilu-private':     'Sauna restaurant Sataman Viilu — private',
    'sauna-viilu-public':      'Sataman Viilu — public slot',
    'sauna-lakefront':         'Public lakefront sauna',
    'custom-event':            'Calendar entry',
  };
  return (lang === 'fi' ? FI : EN)[key] ?? key;
}

function formatHelsinki(iso: string, lang: 'fi' | 'en', timeOnly = false): string {
  const d = new Date(iso);
  const locale = lang === 'fi' ? 'fi-FI' : 'en-GB';
  if (timeOnly) {
    return d.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Helsinki',
    });
  }
  return d.toLocaleString(locale, {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    hour:    '2-digit',
    minute:  '2-digit',
    timeZone: 'Europe/Helsinki',
  });
}

function buildHtml(opts: {
  name: string | null;
  title: string;
  startsLocal: string;
  endsLocal: string;
  partySize: number;
  notes: string | null;
  lang: 'fi' | 'en';
}): string {
  const { name, title, startsLocal, endsLocal, partySize, notes, lang } = opts;
  const greeting = lang === 'fi'
    ? (name ? `Hei ${name},` : 'Hei,')
    : (name ? `Hi ${name},` : 'Hi,');
  const intro = lang === 'fi'
    ? 'Tämä on muistutus tulevasta varauksestasi Lutakko.info-palvelussa.'
    : 'This is a reminder of your upcoming Lutakko.info booking.';
  const timeLabel  = lang === 'fi' ? 'Alkamisaika' : 'Starts';
  const partyLabel = lang === 'fi' ? 'Osallistujia' : 'Party';
  const noteLabel  = lang === 'fi' ? 'Lisätieto' : 'Note';
  const ctaLabel   = lang === 'fi' ? 'Avaa varaus' : 'Open your booking';
  const tzLine     = lang === 'fi' ? '(Helsingin aikaa)' : '(Helsinki time)';
  const unsubLine  = lang === 'fi'
    ? 'Et halua enää muistutuksia? Avaa varaus ja poista ruksi.'
    : 'Don’t want reminders anymore? Open the booking and uncheck the box.';

  return `<!doctype html>
<html lang="${lang}">
<body style="margin:0;padding:0;background:#05070d;color:#eaeef8;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#05070d;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="560" style="max-width:560px;background:#0b1120;border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden;">
        <tr><td style="padding:28px 32px 0;">
          <span style="display:inline-block;padding:4px 12px;border:1px solid rgba(34,211,238,0.4);background:rgba(34,211,238,0.1);color:#67e8f9;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;border-radius:999px;">Lutakko.info</span>
        </td></tr>
        <tr><td style="padding:18px 32px 6px;font-size:22px;font-weight:300;letter-spacing:-0.01em;line-height:1.25;">
          ${greeting}
        </td></tr>
        <tr><td style="padding:0 32px 18px;font-size:15px;color:rgba(255,255,255,0.75);">
          ${intro}
        </td></tr>
        <tr><td style="padding:0 32px 8px;font-size:26px;font-weight:300;line-height:1.15;background:linear-gradient(135deg,#22d3ee,#a3e635);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;">
          ${escapeHtml(title)}
        </td></tr>
        <tr><td style="padding:6px 32px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);margin-top:8px;">
            <tr>
              <td style="padding:14px 0;color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:0.28em;text-transform:uppercase;width:120px;">${timeLabel}</td>
              <td style="padding:14px 0;color:#ffffff;font-size:15px;">${startsLocal} → ${endsLocal} <span style="color:rgba(255,255,255,0.45);">${tzLine}</span></td>
            </tr>
            <tr>
              <td style="padding:14px 0;color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:0.28em;text-transform:uppercase;">${partyLabel}</td>
              <td style="padding:14px 0;color:#ffffff;font-size:15px;">${partySize}</td>
            </tr>
            ${notes ? `<tr>
              <td style="padding:14px 0;color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:0.28em;text-transform:uppercase;">${noteLabel}</td>
              <td style="padding:14px 0;color:rgba(255,255,255,0.85);font-size:14px;">${escapeHtml(notes)}</td>
            </tr>` : ''}
          </table>
        </td></tr>
        <tr><td style="padding:24px 32px 32px;">
          <a href="https://lutakko.info/dashboard/#calendar" style="display:inline-block;background:linear-gradient(135deg,#22d3ee,#a3e635);color:#05070d;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;font-size:11px;padding:14px 24px;border-radius:999px;text-decoration:none;">
            ${ctaLabel} →
          </a>
        </td></tr>
        <tr><td style="padding:0 32px 28px;color:rgba(255,255,255,0.4);font-size:11px;line-height:1.6;">
          ${unsubLine}<br/>
          Lutakko.info — Voon IQ · <a href="mailto:news@lutakko.info" style="color:rgba(255,255,255,0.6);text-decoration:underline;">news@lutakko.info</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
