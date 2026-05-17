'use client';

import { motion } from 'framer-motion';
import type { Category, FeatureCardCopy } from '@/data/content';
import { useLang } from '@/context/LanguageContext';

interface Props {
  category: Category;
}

export default function FeatureGrid({ category }: Props) {
  const { lang } = useLang();
  const t = category[lang];

  return (
    <section
      id={category.id}
      className="relative isolate overflow-hidden py-24 sm:py-32"
      style={{
        background:
          'linear-gradient(180deg, rgba(5,7,13,1) 0%, rgba(10,15,28,1) 50%, rgba(5,7,13,1) 100%)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background: `radial-gradient(circle at 20% 10%, rgba(${category.themeRgb.join(',')},0.18), transparent 55%), radial-gradient(circle at 90% 90%, rgba(${category.themeRgbSecondary.join(',')},0.12), transparent 55%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.4em]"
            style={{
              borderColor: `rgba(${category.themeRgb.join(',')},0.35)`,
              color: category.themeColor,
              background: `rgba(${category.themeRgb.join(',')},0.08)`,
            }}
          >
            {t.tagline}
          </span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-tightest text-white">
            {t.details.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{t.details.desc}</p>
        </motion.div>

        {/* Bullet rail + card grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Bullet rail */}
          <motion.ul
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {t.details.bulletPoints.map((b, i) => (
              <li
                key={i}
                className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-semibold"
                  style={{
                    background: `rgba(${category.themeRgb.join(',')},0.18)`,
                    color: category.themeColor,
                    border: `1px solid rgba(${category.themeRgb.join(',')},0.35)`,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-relaxed text-white/85">{b}</span>
              </li>
            ))}
          </motion.ul>

          {/* Card grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {t.features.map((feature, i) => (
              <motion.article
                key={feature.title + i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.08,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                <span
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-60 transition-opacity group-hover:opacity-100"
                  style={{ background: `rgba(${category.themeRgb.join(',')},0.22)` }}
                />
                <FeatureIcon icon={feature.icon} color={category.themeColor} />
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {feature.description}
                </p>
                <div
                  className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em]"
                  style={{ color: category.themeColor }}
                >
                  <span>{lang === 'fi' ? 'Lue lisää' : 'Learn more'}</span>
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-white/55">
              {category.navLabel[lang]}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              {t.cta.label}
            </h3>
          </div>
          <a
            href={t.cta.href}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-black"
            style={{ background: category.gradient }}
          >
            {t.cta.label}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------- Icon set ----------------------------------------------------- */
function FeatureIcon({ icon, color }: { icon: FeatureCardCopy['icon']; color: string }) {
  const baseProps = {
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-7 w-7',
  };

  const wrap = (path: React.ReactNode) => (
    <span
      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border"
      style={{
        borderColor: `${color}59`,
        background: `${color}1A`,
      }}
    >
      <svg {...baseProps}>{path}</svg>
    </span>
  );

  switch (icon) {
    case 'picnic':
      return wrap(
        <>
          <path d="M5 13h22" />
          <path d="M9 13l3 14" />
          <path d="M23 13l-3 14" />
          <path d="M16 13V5" />
          <path d="M11 5h10" />
        </>,
      );
    case 'kids':
      return wrap(
        <>
          <circle cx="16" cy="9" r="3" />
          <path d="M10 27v-6a6 6 0 0 1 12 0v6" />
          <path d="M13 27v-4" />
          <path d="M19 27v-4" />
        </>,
      );
    case 'sports':
      return wrap(
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M6 16h20" />
          <path d="M16 6v20" />
          <path d="M9 9l14 14" />
        </>,
      );
    case 'viilu':
      return wrap(
        <>
          <path d="M5 26V14l11-8 11 8v12" />
          <path d="M5 26h22" />
          <path d="M13 26v-8h6v8" />
        </>,
      );
    case 'marina':
      return wrap(
        <>
          <path d="M16 4v18" />
          <circle cx="16" cy="6" r="2" />
          <path d="M11 14h10" />
          <path d="M6 22c0 2 4 4 10 4s10-2 10-4" />
          <path d="M9 28c2 1 4 1 7 1s5 0 7-1" />
        </>,
      );
    case 'stage':
      return wrap(
        <>
          <rect x="5" y="11" width="22" height="14" rx="2" />
          <path d="M5 11l4-5h14l4 5" />
          <path d="M11 25v3" />
          <path d="M21 25v3" />
        </>,
      );
    case 'food':
      return wrap(
        <>
          <path d="M7 6v10c0 2 1 3 3 3v8" />
          <path d="M7 6v5" />
          <path d="M11 6v5" />
          <path d="M15 6v10c0 2 1 3 3 3v8" />
          <path d="M23 6c2 0 3 3 3 7s-1 5-3 5v9" />
        </>,
      );
    case 'sauna':
      return wrap(
        <>
          <rect x="5" y="9" width="22" height="16" rx="2" />
          <path d="M11 14v6" />
          <path d="M16 14v6" />
          <path d="M21 14v6" />
          <path d="M9 5c0 1.5 1.5 1.5 1.5 3S9 9.5 9 11" />
          <path d="M15 5c0 1.5 1.5 1.5 1.5 3S15 9.5 15 11" />
          <path d="M21 5c0 1.5 1.5 1.5 1.5 3S21 9.5 21 11" />
        </>,
      );
    case 'rally':
      return wrap(
        <>
          <path d="M3 19h26" />
          <path d="M7 19v-4l4-6h10l3 4 3 2v4" />
          <circle cx="11" cy="22" r="3" />
          <circle cx="23" cy="22" r="3" />
        </>,
      );
    default:
      return wrap(<circle cx="16" cy="16" r="10" />);
  }
}
