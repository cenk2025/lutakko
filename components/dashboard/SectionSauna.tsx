'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { SAUNAS, DASHBOARD_COPY, formatDuration } from '@/data/dashboard';
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
  onBooked?: () => void;
}

export default function SectionSauna({ onBooked }: Props) {
  const { lang } = useLang();
  const t = DASHBOARD_COPY[lang];
  const [selectedId, setSelectedId] = useState<string>(SAUNAS[0].id);
  const selected = SAUNAS.find((s) => s.id === selectedId) ?? SAUNAS[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
      <section>
        <h2 className="font-display text-2xl font-extrabold text-white">{t.sauna.title}</h2>
        <p className="mt-1 text-sm text-white/65">{t.sauna.sub}</p>

        <ul className="mt-5 grid gap-3">
          {SAUNAS.map((s, i) => {
            const active = s.id === selectedId;
            return (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(s.id)}
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                    active
                      ? 'border-white/30 bg-white/[0.06]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                  aria-pressed={active}
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${ACCENT_BG[s.accent]}`}
                  >
                    <SaunaGlyph className={ACCENT_TEXT[s.accent]} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{s[lang].title}</p>
                    <p className="mt-1 text-xs text-white/60">{s[lang].desc}</p>
                  </div>
                  <span className="hidden rounded-full bg-white/[0.05] px-3 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-white/70 sm:inline">
                    {formatDuration(s.durationMins, lang)}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br blur-3xl ${ACCENT_BG[selected.accent]}`}
        />
        <div className="relative">
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/45">
            {t.tabs.sauna}
          </p>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-white">{selected[lang].title}</h3>
          <p className="mt-2 text-sm text-white/65">{selected[lang].desc}</p>

          <BookingForm kind="sauna" item={selected} onSuccess={onBooked} />
        </div>
      </section>
    </div>
  );
}

function SaunaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`h-6 w-6 ${className ?? ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="9" width="22" height="16" rx="2" />
      <path d="M11 14v6M16 14v6M21 14v6" />
      <path d="M9 5c0 1.5 1.5 1.5 1.5 3S9 9.5 9 11M15 5c0 1.5 1.5 1.5 1.5 3S15 9.5 15 11M21 5c0 1.5 1.5 1.5 1.5 3S21 9.5 21 11" />
    </svg>
  );
}
