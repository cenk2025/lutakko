# `send-booking-reminders` Edge Function — deploy guide

This is the worker that powers the **"Muistuta minua sähköpostilla tunti ennen tapahtumaa"** checkbox in the dashboard calendar. Every ~10 minutes it scans `public.bookings`, picks the rows whose `starts_at` falls inside the next 60 minutes (with `remind_email = true`, not cancelled, not already sent), and ships a bilingual e-mail via `mail.zoner.fi`.

---

## 1) One-time tooling

```bash
# Install the Supabase CLI (macOS)
brew install supabase/tap/supabase

# Sign in (opens browser)
supabase login

# Link the local repo to the cloud project
cd /Volumes/T7/MACBOOK\ AIR/VISUALSTUDIO2026/lutakko
supabase link --project-ref <PROJECT_REF>
```

`<PROJECT_REF>` is the subdomain part of your Supabase URL. From `NEXT_PUBLIC_SUPABASE_URL` in `.env.local` — the bit before `.supabase.co`.

> If you don’t want the CLI: every step below can also be done from the Supabase Dashboard (Functions UI + Secrets UI). The CLI is just faster.

---

## 2) Configure secrets

Pick a long random string as the cron secret first:

```bash
# Generate a 48-char secret (macOS):
LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 48 ; echo
```

Then push every secret the function needs:

```bash
supabase secrets set \
  SMTP_HOST=mail.zoner.fi \
  SMTP_PORT=465 \
  SMTP_USER=noreply@lutakko.info \
  SMTP_PASS='<the mailbox password>' \
  SMTP_FROM='Lutakko.info <noreply@lutakko.info>' \
  CRON_SECRET='<the 48-char string you just generated>'
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected by the Edge Function runtime automatically — don't set them yourself.

---

## 3) Deploy the function

```bash
supabase functions deploy send-booking-reminders
```

CLI uploads the code + sets up the public HTTPS endpoint. The URL pattern is:

```
https://<PROJECT_REF>.supabase.co/functions/v1/send-booking-reminders
```

---

## 4) Smoke-test it manually (without waiting for cron)

```bash
curl -X POST \
  -H "Authorization: Bearer <CRON_SECRET>" \
  "https://<PROJECT_REF>.supabase.co/functions/v1/send-booking-reminders"
```

Expected first-time response:

```json
{"ok": true, "found": 0, "sent": 0}
```

To exercise the email path: open `/dashboard/#calendar`, add a calendar event scheduled ~30 minutes from now with **"Muistuta minua sähköpostilla tunti ennen tapahtumaa"** checked. Curl again — the response should report `"sent": 1`, your inbox should receive a bilingual reminder from `noreply@lutakko.info`, and the row's `notification_sent_at` should be stamped (you can check in `Table Editor → bookings`).

---

## 5) Schedule via pg_cron

Open **Supabase Dashboard → SQL Editor**, paste the contents of

```
supabase/migrations/2026-05-22_booking_reminder_cron.sql
```

**Edit the two placeholders before running:**

- `<PROJECT_REF>` → e.g. `zkorzrrmcwlwgmssomja`
- `<CRON_SECRET>` → the same string you pushed to `supabase secrets set CRON_SECRET=…`

Run. The schedule named `send-booking-reminders` fires `*/10 * * * *` (every 10 minutes).

Verify:

```sql
select jobname, schedule, active from cron.job;
select status, return_message, start_time
  from cron.job_run_details
  where jobname = 'send-booking-reminders'
  order by start_time desc
  limit 10;
```

---

## 6) Operational notes

- **Auth:** the function rejects requests unless `Authorization: Bearer <CRON_SECRET>` matches. pg_cron sets this header on every call; manual curls must too.
- **De-duplication:** once an e-mail is sent, `notification_sent_at` is stamped. The next cron tick will simply skip that booking.
- **Cancelled bookings:** filtered out (`status <> 'cancelled'`).
- **Past bookings:** filtered out (`starts_at >= now()`), so cron downtime never causes late reminders.
- **Tz:** the e-mail body formats times in Europe/Helsinki via `Intl.DateTimeFormat`.
- **Languages:** uses `profiles.preferred_lang`; falls back to FI.
- **SMTP TLS:** `tls: true` is used when `SMTP_PORT === 465`. For port 587 the denomailer client negotiates STARTTLS automatically.

---

## 7) Iteration / rollback

- Edit `index.ts` locally, re-run `supabase functions deploy send-booking-reminders`. Existing scheduled jobs keep working.
- To pause: `select cron.unschedule('send-booking-reminders');` in the SQL editor. Re-run the migration to re-enable.
- To remove permanently: same `unschedule` call + `supabase functions delete send-booking-reminders`.
