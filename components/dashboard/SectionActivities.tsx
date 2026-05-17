'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { ACTIVITIES, DASHBOARD_COPY, formatDuration } from '@/data/dashboard';
import BookingForm from './BookingForm';

const ACCENT_BG: Record<string, string> = {
  cyan:   'from-cyan-400/40   to-cyan-400/10',
  lime:   'from-lime-400/40   to-lime-400/10',
  amber:  'from-amber-400/40  to-amber-400/10',
  violet: 'from-violet-400/40 to-violet-400/10',
  rose:   'from-rose-400/40   to-rose-400/10',
};
const ACCENT_TEXT: Record<string, string> = {
  cyan:   'text-cyan-300',
  lime:   'text-lime-300',
  amber:  'text-amber-300',
  violet: 'text-violet-300',
  rose:   'text-rose-300',
};

interface Props {
  preselectId?: string | null;
  onBooked?: () => void;
}

export default function SectionActivities({ preselectId, onBooked }: Props) {
  const { lang } = useLang();
  const t = DASHBOARD_COPY[lang];
  const [selectedId, setSelectedId] = useState<string>(preselectId ?? ACTIVITIES[0].id);
  const selected = ACTIVITIES.find((a) => a.id === selectedId) ?? ACTIVITIES[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
      {/* Activity catalog */}
      <section>
        <h2 className="font-display text-2xl font-extrabold text-white">{t.activities.title}</h2>
        <p className="mt-1 text-sm text-white/65">{t.activities.sub}</p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {ACTIVITIES.map((a, i) => {
            const active = a.id === selectedId;
            return (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(a.id)}
                  className={`group w-full overflow-hidden rounded-2xl border p-4 text-left transition-colors ${
                    active
                      ? 'border-white/30 bg-white/[0.06]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                  aria-pressed={active}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${ACCENT_BG[a.accent]}`}
                    >
                      <DotIcon className={ACCENT_TEXT[a.accent]} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-white">{a[lang].title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-white/60">{a[lang].desc}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {a.durationMins.map((m) => (
                          <span
                            key={m}
                            className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[0.6rem] text-white/65"
                          >
                            {formatDuration(m, lang)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* Booking panel */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br blur-3xl ${ACCENT_BG[selected.accent]}`}
        />
        <div className="relative">
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/45">
            {t.tabs.activities}
          </p>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-white">{selected[lang].title}</h3>
          <p className="mt-2 text-sm text-white/65">{selected[lang].desc}</p>

          <BookingForm
            kind="activity"
            item={selected}
            onSuccess={onBooked}
          />
        </div>
      </section>
    </div>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className ?? ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}
