'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import FeatureGrid from './FeatureGrid';
import SmartImage from './SmartImage';
import type { Category } from '@/data/content';
import { useLang } from '@/context/LanguageContext';

interface Props {
  category: Category;
  index: number;
}

const CategorySection = forwardRef<HTMLDivElement, Props>(function CategorySection(
  { category, index },
  ref,
) {
  const { lang } = useLang();
  const t = category[lang];
  const reversed = index % 2 === 1;

  return (
    <section
      ref={ref}
      data-category-id={category.id}
      id={category.id}
      className="relative isolate overflow-hidden border-b border-white/5"
      style={
        {
          ['--theme-r' as never]: String(category.themeRgb[0]),
          ['--theme-g' as never]: String(category.themeRgb[1]),
          ['--theme-b' as never]: String(category.themeRgb[2]),
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 15% 0%, rgba(${category.themeRgb.join(',')},0.14), transparent 55%), radial-gradient(circle at 85% 100%, rgba(${category.themeRgbSecondary.join(',')},0.10), transparent 55%), linear-gradient(180deg, #05070d, #03050a)`,
        }}
      />

      {/* ----- Spotlight: hero image + intro copy ----- */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14 ${reversed ? 'lg:[&>div:first-child]:order-2' : ''}`}
        >
          {/* Spotlight image */}
          <div className="relative">
            <SmartImage
              src={category.assets.hero.src}
              alt={category.assets.hero.alt[lang]}
              fallbackRgb={category.themeRgb}
              className="aspect-[4/5] w-full rounded-[28px] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] sm:aspect-[5/4] lg:aspect-[4/5]"
              loading="eager"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-1 -z-10 rounded-[32px] blur-3xl"
              style={{ background: `rgba(${category.themeRgb.join(',')},0.25)` }}
            />
            <div
              className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs"
            >
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/55">
                {String(index + 1).padStart(2, '0')} · {category.navLabel[lang]}
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{t.title}</p>
            </div>
          </div>

          {/* Intro copy */}
          <div>
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
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5.4vw,4.4rem)] font-extrabold leading-[0.98] tracking-tightest text-white">
              {t.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{t.subtitle}</p>
            <p className="mt-4 max-w-2xl text-sm text-white/55 sm:text-base">{t.description}</p>

            {/* Mini sub-sections */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[t.section1, t.section2, t.section3].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
                >
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-white/45">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">{s.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ----- Gallery rail ----- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {category.assets.gallery.map((g, i) => (
            <motion.div
              key={g.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <SmartImage
                src={g.src}
                alt={g.alt[lang]}
                fallbackRgb={category.themeRgb}
                className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="pointer-events-none absolute bottom-3 left-3 right-3 text-xs text-white/85">
                {g.alt[lang]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ----- Feature grid (icons + bullets + CTA) ----- */}
      <FeatureGrid category={category} />
    </section>
  );
});

export default CategorySection;
