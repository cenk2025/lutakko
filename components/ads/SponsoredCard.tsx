'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { getLiveAds, type Ad } from '@/lib/ads';
import SmartImage from '@/components/SmartImage';

interface Props {
  /** Category id (e.g. 'festivals-culture'). Null = match any. */
  category: string;
  /** RGB triplet for themed accents. */
  themeRgb?: [number, number, number];
}

/**
 * Sponsored card displayed alongside the regular FeatureGrid cards.
 * Returns null when no live ad targets this category — no empty slot.
 */
export default function SponsoredCard({ category, themeRgb = [34, 211, 238] }: Props) {
  const { lang } = useLang();
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    let active = true;
    getLiveAds('category-card', { category, limit: 1 }).then((rows) => {
      if (!active) return;
      setAd(rows[0] ?? null);
    });
    return () => {
      active = false;
    };
  }, [category]);

  if (!ad) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/[0.06] to-white/[0.03] p-6 backdrop-blur-xl"
      aria-label={lang === 'fi' ? 'Sponsoroitu' : 'Sponsored'}
    >
      <span
        aria-hidden
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl"
      />

      <div className="relative flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-amber-300">
          {lang === 'fi' ? 'Sponsoroitu' : 'Sponsored'}
        </span>
        {ad.sponsor_name && (
          <span className="text-[0.6rem] uppercase tracking-[0.32em] text-white/50">
            {ad.sponsor_name}
          </span>
        )}
      </div>

      {ad.image_url && (
        <SmartImage
          src={ad.image_url}
          alt={ad.title}
          fallbackRgb={themeRgb}
          className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10"
        />
      )}

      <h3 className="relative mt-5 font-display text-xl font-light tracking-tight text-white sm:text-2xl">
        {ad.title}
      </h3>
      {ad.body && (
        <p className="relative mt-2 text-base font-light leading-relaxed text-white/80">{ad.body}</p>
      )}
      {ad.cta_label && ad.cta_href && (
        <a
          href={ad.cta_href}
          rel="sponsored noopener"
          className="relative mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-amber-300 hover:text-amber-200"
        >
          {ad.cta_label}
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </a>
      )}
    </motion.article>
  );
}
