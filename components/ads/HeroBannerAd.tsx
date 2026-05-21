'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { getLiveAds, type Ad } from '@/lib/ads';
import SmartImage from '@/components/SmartImage';

/**
 * Full-width sponsor banner shown between the hero canvas and the first
 * content section. Rotates through the live "hero-banner" inventory; if
 * nothing is scheduled the strip is omitted (no DOM, no empty space).
 */
export default function HeroBannerAd() {
  const { lang } = useLang();
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    let active = true;
    getLiveAds('hero-banner', { limit: 5 }).then((rows) => {
      if (!active) return;
      setAds(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  if (ads.length === 0) return null;
  const ad = ads[0]; // highest priority, freshest

  return (
    <section
      className="relative isolate border-y border-white/5"
      aria-label={lang === 'fi' ? 'Sponsoroitu mainos' : 'Sponsored ad'}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(163,230,53,0.12), transparent 55%), linear-gradient(180deg, #05070d, #03050a)',
        }}
      />
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:grid-cols-[1.4fr_1fr] sm:p-8 lg:grid-cols-[1.6fr_1fr]"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-amber-300">
              {lang === 'fi' ? 'Sponsoroitu' : 'Sponsored'}
              {ad.sponsor_name ? <span className="text-white/55">· {ad.sponsor_name}</span> : null}
            </span>
            <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tightest text-white sm:text-3xl lg:text-4xl">
              {ad.title}
            </h3>
            {ad.body && (
              <p className="mt-3 max-w-xl text-base font-light text-white/80 sm:text-lg">{ad.body}</p>
            )}
            {ad.cta_label && ad.cta_href && (
              <a
                href={ad.cta_href}
                rel="sponsored noopener"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.02]"
              >
                {ad.cta_label}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            )}
          </div>
          {ad.image_url ? (
            <SmartImage
              src={ad.image_url}
              alt={ad.title}
              fallbackRgb={[34, 211, 238]}
              className="aspect-[4/3] w-full rounded-2xl border border-white/10"
              hideCredit
            />
          ) : (
            <div className="grid aspect-[4/3] w-full place-items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-[0.65rem] uppercase tracking-[0.4em] text-white/40">
              {lang === 'fi' ? 'Mainospaikka' : 'Ad slot'}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
