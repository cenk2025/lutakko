'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import {
  DASHBOARD_COPY,
  TIME_SLOTS,
  PARTY_SIZE_OPTIONS,
  formatDuration,
  type ActivityItem,
  type SaunaItem,
  type BookingKind,
} from '@/data/dashboard';
import { createBooking } from '@/lib/bookings';

interface Props {
  kind: BookingKind;
  /** Either an ActivityItem or SaunaItem. */
  item: ActivityItem | SaunaItem;
  onSuccess?: () => void;
}

function isActivity(it: ActivityItem | SaunaItem): it is ActivityItem {
  return Array.isArray((it as ActivityItem).durationMins);
}

function todayLocalISO(): string {
  const d = new Date();
  const offsetMs = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - offsetMs).toISOString().slice(0, 10);
}

export default function BookingForm({ kind, item, onSuccess }: Props) {
  const { lang } = useLang();
  const { configured } = useAuth();
  const t = DASHBOARD_COPY[lang];

  const durations = isActivity(item) ? item.durationMins : [item.durationMins];
  const defaultIdx = isActivity(item) ? item.defaultDurationIdx : 0;

  const [date, setDate]       = useState<string>(todayLocalISO());
  const [time, setTime]       = useState<string>(TIME_SLOTS[2]);
  const [durIdx, setDurIdx]   = useState<number>(defaultIdx);
  const [party, setParty]     = useState<number>(Math.min(2, item.maxParty));
  const [notes, setNotes]     = useState<string>('');

  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Reset transient state when switching item
    setError(null);
    setSuccess(false);
    setDurIdx(defaultIdx);
  }, [item.id, defaultIdx]);

  const partyOptions = useMemo(
    () => PARTY_SIZE_OPTIONS.filter((n) => n <= item.maxParty),
    [item.maxParty],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!configured) {
      setError(t.common.notConfigured);
      return;
    }

    const [hh, mm] = time.split(':').map(Number);
    const start = new Date(`${date}T00:00:00`);
    start.setHours(hh, mm, 0, 0);
    const mins = durations[durIdx];
    const end = new Date(start.getTime() + mins * 60_000);

    setBusy(true);
    try {
      await createBooking({
        kind,
        item_key: item.id,
        starts_at: start.toISOString(),
        ends_at: end.toISOString(),
        party_size: party,
        notes: notes.trim() || null,
      });
      setSuccess(true);
      setNotes('');
      onSuccess?.();
    } catch (err) {
      setError(humaniseBookingError(err, lang));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
      <Field label={t.common.date}>
        <input
          type="date"
          required
          value={date}
          min={todayLocalISO()}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
        />
      </Field>

      <Field label={t.common.time}>
        <select
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
        >
          {TIME_SLOTS.map((s) => (
            <option key={s} value={s} className="bg-[#080c14]">
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t.common.duration}>
        <div className="flex flex-wrap gap-2">
          {durations.map((m, i) => {
            const active = i === durIdx;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setDurIdx(i)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'border-transparent bg-gradient-to-br from-cyan-400 to-lime-400 text-black'
                    : 'border-white/15 bg-white/[0.04] text-white/75 hover:border-white/30'
                }`}
                aria-pressed={active}
              >
                {formatDuration(m, lang)}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label={t.common.partySize}>
        <select
          value={party}
          onChange={(e) => setParty(Number(e.target.value))}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
        >
          {partyOptions.map((n) => (
            <option key={n} value={n} className="bg-[#080c14]">
              {n}
            </option>
          ))}
        </select>
      </Field>

      <div className="sm:col-span-2">
        <Field label={t.common.notes}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t.common.notesPlaceholder}
            rows={2}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-400/60"
          />
        </Field>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="sm:col-span-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs text-rose-200"
          >
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="sm:col-span-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200"
          >
            {t.common.successBooking}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black disabled:cursor-progress disabled:opacity-70 sm:w-auto"
        >
          {busy ? (
            <Spinner />
          ) : (
            <>
              {item[lang].cta}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/55">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 3a9 9 0 0 1 9 9" />
      <path opacity="0.3" d="M12 21a9 9 0 0 1-9-9" />
    </svg>
  );
}

function humaniseBookingError(err: unknown, lang: 'fi' | 'en'): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg === 'supabase-not-configured' || msg === 'not-signed-in') {
    return DASHBOARD_COPY[lang].common.notConfigured;
  }
  return msg;
}
