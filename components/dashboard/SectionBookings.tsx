'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { DASHBOARD_COPY, resolveItemLabel } from '@/data/dashboard';
import { cancelBooking, listBookings, type Booking } from '@/lib/bookings';

type Filter = 'all' | 'upcoming' | 'past' | 'cancelled' | 'activity' | 'sauna';

interface Props {
  /** Bumped when a new booking is created elsewhere so the list refreshes. */
  refreshKey?: number;
}

export default function SectionBookings({ refreshKey = 0 }: Props) {
  const { lang } = useLang();
  const { configured, user } = useAuth();
  const t = DASHBOARD_COPY[lang];

  const [items, setItems]   = useState<Booking[]>([]);
  const [loading, setLoad]  = useState<boolean>(true);
  const [error, setError]   = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [busyId, setBusyId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!configured || !user) {
      setItems([]);
      setLoad(false);
      return;
    }
    setLoad(true);
    setError(null);
    try {
      const rows = await listBookings();
      setItems(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoad(false);
    }
  }, [configured, user]);

  useEffect(() => {
    void reload();
  }, [reload, refreshKey]);

  const filtered = useMemo(() => {
    const now = Date.now();
    return items.filter((b) => {
      if (filter === 'activity'  && b.kind   !== 'activity')         return false;
      if (filter === 'sauna'     && b.kind   !== 'sauna')            return false;
      if (filter === 'cancelled' && b.status !== 'cancelled')        return false;
      if (filter === 'past'      && (b.status === 'cancelled' || Date.parse(b.ends_at) >= now)) return false;
      if (filter === 'upcoming'  && (b.status === 'cancelled' || Date.parse(b.ends_at) < now))  return false;
      return true;
    });
  }, [items, filter]);

  const onCancel = async (id: string) => {
    if (!window.confirm(t.bookings.cancelConfirm)) return;
    setBusyId(id);
    try {
      await cancelBooking(id);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white">{t.bookings.title}</h2>
          <p className="mt-1 text-sm text-white/65">{user?.email ?? ''}</p>
        </div>

        {/* Filter pills */}
        <div className="no-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1">
          {([
            ['all',       t.bookings.filterAll],
            ['upcoming',  t.bookings.filterUpcoming],
            ['past',      t.bookings.filterPast],
            ['cancelled', t.bookings.filterCancelled],
            ['activity',  t.bookings.filterActivity],
            ['sauna',     t.bookings.filterSauna],
          ] as [Filter, string][]).map(([id, label]) => {
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active ? 'text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="bookings-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* States */}
      {loading && (
        <p className="mt-8 text-sm text-white/55">{t.common.loading}</p>
      )}
      {!loading && !configured && (
        <p className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          {t.common.notConfigured}
        </p>
      )}
      {!loading && configured && error && (
        <p className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {t.common.error}: {error}
          <button onClick={reload} className="ml-3 underline-offset-4 hover:underline">
            {t.common.retry}
          </button>
        </p>
      )}
      {!loading && configured && !error && filtered.length === 0 && (
        <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-12 text-center text-sm text-white/55">
          {t.bookings.empty}
        </p>
      )}

      <ul className="mt-6 grid gap-3">
        <AnimatePresence initial={false}>
          {filtered.map((b) => (
            <BookingRow
              key={b.id}
              booking={b}
              busy={busyId === b.id}
              onCancel={() => onCancel(b.id)}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function BookingRow({
  booking,
  busy,
  onCancel,
}: {
  booking: Booking;
  busy: boolean;
  onCancel: () => void;
}) {
  const { lang } = useLang();
  const t = DASHBOARD_COPY[lang];
  const label = resolveItemLabel(booking.kind, booking.item_key, lang);

  const dateLabel = new Date(booking.starts_at).toLocaleString(lang === 'fi' ? 'fi-FI' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const endLabel = new Date(booking.ends_at).toLocaleString(lang === 'fi' ? 'fi-FI' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isPast      = Date.parse(booking.ends_at) < Date.now();
  const isCancelled = booking.status === 'cancelled';

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-wrap items-center gap-4 rounded-2xl border p-4 ${
        isCancelled
          ? 'border-white/5 bg-white/[0.02] text-white/45'
          : 'border-white/10 bg-white/[0.04] text-white'
      }`}
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${
          booking.kind === 'sauna'
            ? 'from-amber-400/40 to-amber-400/10 text-amber-200'
            : 'from-cyan-400/40 to-cyan-400/10 text-cyan-200'
        }`}
      >
        {booking.kind === 'sauna' ? <SaunaG /> : <ActG />}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{label}</p>
        <p className="mt-1 text-xs text-white/65">
          {dateLabel} – {endLabel} · {booking.party_size} {lang === 'fi' ? 'hlö' : 'pax'}
        </p>
        {booking.notes && (
          <p className="mt-1 text-xs text-white/45">“{booking.notes}”</p>
        )}
      </div>

      <span
        className={`rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.32em] ${
          isCancelled
            ? 'bg-white/[0.04] text-white/45'
            : isPast
              ? 'bg-white/[0.06] text-white/65'
              : 'bg-emerald-400/15 text-emerald-200'
        }`}
      >
        {isCancelled
          ? t.common.cancelled
          : isPast
            ? t.bookings.filterPast
            : t.common.confirmed}
      </span>

      {!isCancelled && !isPast && (
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/85 hover:border-rose-300/50 hover:text-rose-200 disabled:opacity-60"
        >
          {busy ? t.common.cancelling : t.common.cancel}
        </button>
      )}
    </motion.li>
  );
}

function SaunaG() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="11" rx="1.5" />
      <path d="M8 11v5M12 11v5M16 11v5" />
    </svg>
  );
}
function ActG() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3v18" />
    </svg>
  );
}
