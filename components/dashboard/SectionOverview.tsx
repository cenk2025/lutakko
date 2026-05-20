'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { DASHBOARD_COPY, resolveItemLabel, type DashboardTab } from '@/data/dashboard';
import { listBookings, type Booking } from '@/lib/bookings';

interface Props {
  onJump: (tab: DashboardTab) => void;
  refreshKey?: number;
}

export default function SectionOverview({ onJump, refreshKey = 0 }: Props) {
  const { lang } = useLang();
  const { user, configured } = useAuth();
  const t = DASHBOARD_COPY[lang];

  const [items, setItems]   = useState<Booking[]>([]);
  const [loading, setLoad]  = useState<boolean>(true);
  const [error, setError]   = useState<string | null>(null);

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

  const stats = useMemo(() => {
    const now = Date.now();
    const active = items.filter((b) => b.status !== 'cancelled');
    return {
      upcoming:  active.filter((b) => Date.parse(b.ends_at) >= now).length,
      completed: active.filter((b) => Date.parse(b.ends_at) < now).length,
      sauna:     active.filter((b) => b.kind === 'sauna').length,
      total:     active.length,
    };
  }, [items]);

  const upcoming = useMemo(() => {
    const now = Date.now();
    return items
      .filter((b) => b.status !== 'cancelled' && Date.parse(b.ends_at) >= now)
      .sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at))
      .slice(0, 4);
  }, [items]);

  const firstName = (user?.email ?? '').split('@')[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* Greeting + stats */}
      <section>
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-tight text-white">
          {t.overview.hello}, <span className="text-gradient">{firstName || '—'}</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm text-white/65 sm:text-base">{t.overview.welcome}</p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'upcoming',  v: stats.upcoming,  label: t.overview.stats.upcoming },
            { k: 'completed', v: stats.completed, label: t.overview.stats.completed },
            { k: 'sauna',     v: stats.sauna,     label: t.overview.stats.sauna },
            { k: 'total',     v: stats.total,     label: t.overview.stats.total },
          ].map((s, i) => (
            <motion.li
              key={s.k}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
            >
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/45">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-extrabold text-white">{s.v}</p>
            </motion.li>
          ))}
        </ul>

        {/* Upcoming bookings */}
        <div className="mt-8 flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold text-white">{t.overview.upcoming}</h3>
          <button
            type="button"
            onClick={() => onJump('bookings')}
            className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/65 hover:text-white"
          >
            {t.overview.seeAll}
          </button>
        </div>

        {loading && <p className="mt-3 text-sm text-white/55">{t.common.loading}</p>}
        {!loading && !configured && (
          <p className="mt-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            {t.common.notConfigured}
          </p>
        )}
        {!loading && configured && error && (
          <p className="mt-3 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            {t.common.error}: {error}
          </p>
        )}
        {!loading && configured && !error && upcoming.length === 0 && (
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-sm text-white/55">
            {t.overview.none}
          </p>
        )}

        <ul className="mt-3 grid gap-2">
          {upcoming.map((b, i) => {
            const dateLabel = new Date(b.starts_at).toLocaleString(
              lang === 'fi' ? 'fi-FI' : 'en-GB',
              { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' },
            );
            return (
              <motion.li
                key={b.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-lg ${
                    b.kind === 'sauna'
                      ? 'bg-amber-400/15 text-amber-200'
                      : 'bg-cyan-400/15 text-cyan-200'
                  }`}
                >
                  {b.kind === 'sauna' ? '♨︎' : '◎'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {resolveItemLabel(b.kind, b.item_key, lang)}
                  </p>
                  <p className="text-xs text-white/60">{dateLabel} · {b.party_size}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* Quick actions */}
      <section className="space-y-3">
        <h3 className="font-display text-lg font-extrabold text-white">{t.overview.quickActions}</h3>
        <button
          type="button"
          onClick={() => onJump('activities')}
          className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur transition-colors hover:border-white/20"
        >
          <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/25 blur-3xl" />
          <p className="relative text-[0.6rem] uppercase tracking-[0.4em] text-cyan-300">
            {t.tabs.activities}
          </p>
          <p className="relative mt-2 font-display text-xl font-extrabold text-white">
            {t.overview.browseActivities}
          </p>
          <p className="relative mt-1 text-xs text-white/60">
            {lang === 'fi'
              ? 'Beach volley, kajakit, vierasvenepaikat, ulkokuntosali…'
              : 'Beach volley, kayaks, marina berths, outdoor gym…'}
          </p>
        </button>

        <button
          type="button"
          onClick={() => onJump('sauna')}
          className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur transition-colors hover:border-white/20"
        >
          <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/25 blur-3xl" />
          <p className="relative text-[0.6rem] uppercase tracking-[0.4em] text-amber-300">
            {t.tabs.sauna}
          </p>
          <p className="relative mt-2 font-display text-xl font-extrabold text-white">
            {t.overview.bookSauna}
          </p>
          <p className="relative mt-1 text-xs text-white/60">
            {lang === 'fi'
              ? 'Viilun privaatti, julkinen vuoro tai rantasauna.'
              : 'Viilu private, public slot or lakefront sauna.'}
          </p>
        </button>

        <button
          type="button"
          onClick={() => onJump('bookings')}
          className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur transition-colors hover:border-white/20"
        >
          <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lime-400/25 blur-3xl" />
          <p className="relative text-[0.6rem] uppercase tracking-[0.4em] text-lime-300">
            {t.tabs.bookings}
          </p>
          <p className="relative mt-2 font-display text-xl font-extrabold text-white">
            {t.overview.seeAll}
          </p>
        </button>
      </section>
    </div>
  );
}
