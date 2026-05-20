'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { DASHBOARD_COPY, resolveItemLabel } from '@/data/dashboard';
import { createBooking, listBookings, type Booking } from '@/lib/bookings';

interface Props {
  refreshKey?: number;
  onBooked?: () => void;
}

/* -------- date helpers (no external lib) ----------------------------- */

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
/** Returns the Monday on or before the given date (Mon-first week). */
function startOfWeekMonday(d: Date): Date {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // 0 = Monday
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}
function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function toLocalDT(date: Date, time: string): string {
  const [hh, mm] = time.split(':').map(Number);
  const d = new Date(date);
  d.setHours(hh, mm, 0, 0);
  return d.toISOString();
}
function todayISODate(): string {
  const d = new Date();
  const offsetMs = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - offsetMs).toISOString().slice(0, 10);
}

/* -------- component ------------------------------------------------- */

export default function SectionCalendar({ refreshKey = 0, onBooked }: Props) {
  const { lang } = useLang();
  const { configured, user } = useAuth();
  const t = DASHBOARD_COPY[lang].calendar;
  const tc = DASHBOARD_COPY[lang].common;

  const [items, setItems]     = useState<Booking[]>([]);
  const [loading, setLoad]    = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [cursor, setCursor]   = useState<Date>(() => startOfMonth(new Date()));
  const [selected, setSel]    = useState<Date>(() => new Date());
  const [editorOpen, setEditor] = useState(false);
  const [reloadKey, setReload]  = useState(0);

  const reload = useCallback(async () => {
    if (!configured || !user) {
      setItems([]);
      setLoad(false);
      return;
    }
    setLoad(true);
    setError(null);
    try {
      setItems(await listBookings());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoad(false);
    }
  }, [configured, user]);

  useEffect(() => {
    void reload();
  }, [reload, refreshKey, reloadKey]);

  /* ---- month grid (always 6 weeks for stable layout) ---- */
  const gridDates = useMemo(() => {
    const first = startOfWeekMonday(startOfMonth(cursor));
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(first);
      d.setDate(first.getDate() + i);
      days.push(d);
    }
    return days;
  }, [cursor]);

  /* ---- bookings grouped by yyyy-mm-dd ---- */
  const byDay = useMemo(() => {
    const map = new Map<string, Booking[]>();
    items
      .filter((b) => b.status !== 'cancelled')
      .forEach((b) => {
        const d = new Date(b.starts_at);
        const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        const list = map.get(key) ?? [];
        list.push(b);
        map.set(key, list);
      });
    return map;
  }, [items]);

  const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const bookingsOnDay = (d: Date): Booking[] => byDay.get(dayKey(d)) ?? [];

  const goPrev   = () => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const goNext   = () => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  const goToday  = () => {
    setCursor(startOfMonth(new Date()));
    setSel(new Date());
  };

  return (
    <div>
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">{t.title}</h2>
          <p className="mt-1 max-w-2xl text-sm font-light text-white/70 sm:text-base">{t.sub}</p>
        </div>
        <button
          type="button"
          onClick={() => setEditor(true)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {t.addEvent}
        </button>
      </header>

      {/* Reminder hint */}
      <p className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-2 text-[0.7rem] font-light text-amber-200/80">
        {t.reminderHint}
      </p>

      {/* Month nav */}
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label={t.prev}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/75 hover:border-white/30 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="text-center">
          <p className="font-display text-lg font-bold text-white">
            {t.monthNames[cursor.getMonth()]} {cursor.getFullYear()}
          </p>
          <button
            type="button"
            onClick={goToday}
            className="mt-1 text-[0.65rem] uppercase tracking-[0.32em] text-white/55 hover:text-white"
          >
            {t.today}
          </button>
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label={t.next}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/75 hover:border-white/30 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/45">
        {t.dayHeaders.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-7 gap-1">
        {gridDates.map((d) => {
          const inMonth = d.getMonth() === cursor.getMonth();
          const isToday = sameDay(d, new Date());
          const isSel   = sameDay(d, selected);
          const bookings = bookingsOnDay(d);
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => setSel(d)}
              className={`flex aspect-square flex-col rounded-xl border p-1.5 text-left transition-colors sm:p-2
                ${isSel ? 'border-cyan-300/60 bg-cyan-400/10' :
                  isToday ? 'border-white/30 bg-white/[0.06]' :
                  'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]'}`}
            >
              <span className={`text-[0.65rem] font-semibold ${inMonth ? 'text-white' : 'text-white/30'}`}>
                {d.getDate()}
              </span>
              <div className="mt-auto flex flex-col gap-0.5 overflow-hidden">
                {bookings.slice(0, 2).map((b) => (
                  <span
                    key={b.id}
                    className={`truncate rounded-md px-1 py-0.5 text-[0.55rem] ${
                      b.kind === 'sauna'
                        ? 'bg-amber-400/15 text-amber-200'
                        : b.kind === 'event'
                          ? 'bg-violet-400/15 text-violet-200'
                          : 'bg-cyan-400/15 text-cyan-200'
                    }`}
                  >
                    {b.title || resolveItemLabel(b.kind, b.item_key, lang)}
                  </span>
                ))}
                {bookings.length > 2 && (
                  <span className="text-[0.55rem] text-white/45">+{bookings.length - 2}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day details */}
      <section className="mt-8">
        <header className="flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold text-white">
            {selected.toLocaleDateString(lang === 'fi' ? 'fi-FI' : 'en-GB', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </h3>
        </header>

        {loading && <p className="mt-3 text-sm font-light text-white/55">{tc.loading}</p>}
        {!loading && error && (
          <p className="mt-3 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs text-rose-200">
            {error}
          </p>
        )}
        {!loading && !error && bookingsOnDay(selected).length === 0 && (
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-sm font-light text-white/55">
            {t.noBookingsToday}
          </p>
        )}

        <ul className="mt-3 grid gap-2">
          {bookingsOnDay(selected)
            .sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at))
            .map((b) => (
              <li key={b.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <span
                  className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    b.kind === 'sauna'
                      ? 'bg-amber-400/15 text-amber-200'
                      : b.kind === 'event'
                        ? 'bg-violet-400/15 text-violet-200'
                        : 'bg-cyan-400/15 text-cyan-200'
                  }`}
                >
                  {b.kind === 'sauna' ? '♨︎' : b.kind === 'event' ? '◇' : '◎'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">
                    {b.title || resolveItemLabel(b.kind, b.item_key, lang)}
                  </p>
                  <p className="mt-0.5 text-xs font-light text-white/65">
                    {new Date(b.starts_at).toLocaleTimeString(lang === 'fi' ? 'fi-FI' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}
                    {' – '}
                    {new Date(b.ends_at).toLocaleTimeString(lang === 'fi' ? 'fi-FI' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}
                    {' · '}
                    {b.party_size}
                    {b.remind_email && (
                      <span className="ml-2 inline-flex items-center gap-1 text-amber-200">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 7h16v10H4z" />
                          <path d="M4 7l8 6 8-6" />
                        </svg>
                        @
                      </span>
                    )}
                  </p>
                  {b.notes && b.notes !== b.title && (
                    <p className="mt-1 text-xs font-light text-white/50">“{b.notes}”</p>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </section>

      {/* Add-event modal */}
      <AnimatePresence>
        {editorOpen && (
          <AddEventModal
            initialDate={selected}
            onClose={() => setEditor(false)}
            onSaved={() => {
              setEditor(false);
              setReload((k) => k + 1);
              onBooked?.();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Add-event modal                                                    */
/* ------------------------------------------------------------------ */

function AddEventModal({
  initialDate,
  onClose,
  onSaved,
}: {
  initialDate: Date;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { lang } = useLang();
  const { configured } = useAuth();
  const t = DASHBOARD_COPY[lang].calendar;
  const tc = DASHBOARD_COPY[lang].common;

  const [title, setTitle]   = useState('');
  const [date, setDate]     = useState<string>(() => {
    const d = initialDate;
    const off = d.getTimezoneOffset() * 60_000;
    return new Date(d.getTime() - off).toISOString().slice(0, 10);
  });
  const [start, setStart]   = useState('18:00');
  const [end, setEnd]       = useState('20:00');
  const [party, setParty]   = useState(2);
  const [notes, setNotes]   = useState('');
  const [remind, setRemind] = useState(false);
  const [busy, setBusy]     = useState(false);
  const [err, setErr]       = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!title.trim()) {
      setErr(lang === 'fi' ? 'Anna tapahtumalle nimi.' : 'Please give the event a title.');
      return;
    }
    if (!configured) {
      setErr(tc.notConfigured);
      return;
    }
    const dt = new Date(`${date}T00:00:00`);
    const starts_at = toLocalDT(dt, start);
    const ends_at   = toLocalDT(dt, end);
    if (Date.parse(ends_at) <= Date.parse(starts_at)) {
      setErr(lang === 'fi' ? 'Päättymisaika täytyy olla alkamisajan jälkeen.' : 'End time must be after start.');
      return;
    }
    setBusy(true);
    try {
      await createBooking({
        kind: 'event',
        item_key: 'custom-event',
        starts_at,
        ends_at,
        party_size: party,
        notes: notes.trim() || null,
        title: title.trim(),
        remind_email: remind,
      });
      onSaved();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : String(e2));
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-10"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.cancel}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#080c14]/95 p-7 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white"
          aria-label={t.cancel}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">{t.newEventTitle}</h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label={`${t.eventNameField} *`} full>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.eventNamePlaceholder}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.dateField}>
            <input
              type="date"
              required
              value={date}
              min={todayISODate()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.partyField}>
            <input
              type="number"
              min={1}
              max={50}
              value={party}
              onChange={(e) => setParty(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.startField}>
            <input
              type="time"
              required
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.endField}>
            <input
              type="time"
              required
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.notesField} full>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:col-span-2">
            <input
              type="checkbox"
              checked={remind}
              onChange={(e) => setRemind(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-cyan-400"
            />
            <span className="text-sm font-light text-white/85">{t.remindEmail}</span>
          </label>
        </div>

        {err && (
          <p className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs text-rose-200">
            {err}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/85"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black disabled:cursor-progress disabled:opacity-70"
          >
            {busy ? tc.saving : t.save}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

/* helper */
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/55">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
