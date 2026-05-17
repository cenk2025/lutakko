'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HarborCanvasScroll from './HarborCanvasScroll';
import { HERO_SEQUENCE, HERO_TEXT, SITE_META } from '@/data/content';
import { useLang } from '@/context/LanguageContext';

interface HeroScrollyProps {
  /** Fired once every hero frame has finished loading (or errored). */
  onAllLoaded?: () => void;
}

/**
 * Hero scrollytelling — pinned canvas frame sequence with 4 fading text beats.
 * 400vh runway. Frames live at /images/scrollable/hero/.
 */
export default function HeroScrolly({ onAllLoaded }: HeroScrollyProps = {}) {
  const { lang } = useLang();
  const t = HERO_TEXT[lang];
  const meta = SITE_META[lang];
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Four windowed fades, each with subtle y-translate.
  const op1 = useTransform(scrollYProgress, [0.00, 0.04, 0.20, 0.26], [1, 1, 1, 0]);
  const y1  = useTransform(scrollYProgress, [0.00, 0.26], [0, -60]);

  const op2 = useTransform(scrollYProgress, [0.24, 0.30, 0.46, 0.52], [0, 1, 1, 0]);
  const y2  = useTransform(scrollYProgress, [0.24, 0.52], [50, -40]);

  const op3 = useTransform(scrollYProgress, [0.50, 0.56, 0.72, 0.78], [0, 1, 1, 0]);
  const y3  = useTransform(scrollYProgress, [0.50, 0.78], [50, -40]);

  const op4 = useTransform(scrollYProgress, [0.76, 0.82, 0.96, 1.00], [0, 1, 1, 1]);
  const y4  = useTransform(scrollYProgress, [0.76, 1.00], [50, 0]);

  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={wrapperRef} className="relative" id="top">
      <HarborCanvasScroll
        sequence={HERO_SEQUENCE}
        glow={{ primary: [34, 211, 238], secondary: [163, 230, 53] }}
        fit="cover"
        scrollLengthVh={4}
        onAllLoaded={onAllLoaded}
      >
        {/* === Stage overlay ===================================== */}
        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl flex-col px-6 sm:px-10 lg:px-16">

            {/* Top strip — eyebrow + brand mark */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-center justify-between pt-28 sm:pt-32"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.4em] text-white/75 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                {t.eyebrow}
              </span>
              <span className="hidden text-[0.65rem] uppercase tracking-[0.4em] text-white/55 md:inline">
                {meta.tagline}
              </span>
            </motion.div>

            {/* Center stage — all four text beats stack here */}
            <div className="relative flex flex-1 items-center">

              {/* Beat 1 — left */}
              <motion.div
                style={{ opacity: op1, y: y1 }}
                className="absolute inset-x-0 max-w-4xl"
              >
                <h1 className="font-display text-[clamp(3.5rem,11vw,9.5rem)] font-extrabold leading-[0.9] tracking-tightest text-white">
                  <span className="block">{t.beat1.title.split(' ')[0]}</span>
                  <span className="block text-gradient">
                    {t.beat1.title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">{t.beat1.sub}</p>
              </motion.div>

              {/* Beat 2 — left */}
              <motion.div
                style={{ opacity: op2, y: y2 }}
                className="absolute inset-x-0 max-w-2xl text-left"
              >
                <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-cyan-300">
                  02 · Lutakko
                </span>
                <h2 className="mt-4 font-display text-[clamp(2rem,5.4vw,4.4rem)] font-extrabold leading-[0.98] tracking-tightest text-white">
                  {t.beat2.title}
                </h2>
                <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                  {t.beat2.sub}
                </p>
              </motion.div>

              {/* Beat 3 — left */}
              <motion.div
                style={{ opacity: op3, y: y3 }}
                className="absolute inset-x-0 max-w-3xl text-left"
              >
                <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-amber-300">
                  03 · Live
                </span>
                <h2 className="mt-4 font-display text-[clamp(2rem,5.4vw,4.4rem)] font-extrabold leading-[0.98] tracking-tightest text-white">
                  {t.beat3.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
                  {t.beat3.sub}
                </p>
              </motion.div>

              {/* Beat 4 — left, big */}
              <motion.div
                style={{ opacity: op4, y: y4 }}
                className="absolute inset-x-0 max-w-3xl"
              >
                <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-lime-300">
                  04 · {lang === 'fi' ? 'Vuoden ympäri' : 'Year round'}
                </span>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,5.2rem)] font-extrabold leading-[0.95] tracking-tightest text-white">
                  {t.beat4.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{t.beat4.sub}</p>

                <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#festivals-culture"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.02]"
                  >
                    {lang === 'fi' ? 'Aloita kierros' : 'Begin the tour'}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </a>
                  <a
                    href="#footer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur hover:border-white/30"
                  >
                    {lang === 'fi' ? 'Suunnittele käynti' : 'Plan a visit'}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Footer strip — progress bar + scroll hint */}
            <div className="pointer-events-none flex items-center justify-between gap-4 pb-10 text-[0.65rem] uppercase tracking-[0.4em] text-white/55">
              <span className="hidden sm:inline">{t.floor}</span>
              <div className="ml-auto flex w-full max-w-xs items-center gap-3 sm:w-64">
                <span className="text-white/40">00</span>
                <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-300 to-lime-300"
                    style={{ width: progressBar }}
                  />
                </div>
                <span className="text-white">04</span>
              </div>
            </div>
          </div>
        </div>
      </HarborCanvasScroll>
    </div>
  );
}
