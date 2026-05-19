'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroScrolly from '@/components/HeroScrolly';
import CategorySection from '@/components/CategorySection';
import CategoryDeck from '@/components/CategoryDeck';
import HeroBannerAd from '@/components/ads/HeroBannerAd';
import { CATEGORIES } from '@/data/content';

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  /**
   * Gate: the categories, footer and bottom deck only mount AFTER every hero
   * frame has either loaded or errored. Safety fallback below ensures we
   * never block forever if frames fail to come in.
   */
  const [heroLoaded, setHeroLoaded] = useState(false);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (heroLoaded) return;
    const safety = window.setTimeout(() => setHeroLoaded(true), 12000);
    return () => window.clearTimeout(safety);
  }, [heroLoaded]);

  useEffect(() => {
    const c = CATEGORIES[activeIndex];
    if (!c) return;
    const root = document.documentElement;
    root.style.setProperty('--theme-r', String(c.themeRgb[0]));
    root.style.setProperty('--theme-g', String(c.themeRgb[1]));
    root.style.setProperty('--theme-b', String(c.themeRgb[2]));
    root.style.setProperty('--theme-r-2', String(c.themeRgbSecondary[0]));
    root.style.setProperty('--theme-g-2', String(c.themeRgbSecondary[1]));
    root.style.setProperty('--theme-b-2', String(c.themeRgbSecondary[2]));
  }, [activeIndex]);

  // Only start observing sections once they exist (heroLoaded === true).
  useEffect(() => {
    if (!heroLoaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = activeIndex;
        let bestRatio = 0;
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-category-id');
          if (!id) return;
          const idx = CATEGORIES.findIndex((c) => c.id === id);
          if (idx === -1) return;
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIndex = idx;
          }
        });
        if (bestRatio > 0 && bestIndex !== activeIndex) {
          setActiveIndex(bestIndex);
        }
      },
      {
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: '-40% 0px -40% 0px',
      },
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroLoaded]);

  const jumpTo = useCallback((id: string) => {
    const idx = CATEGORIES.findIndex((c) => c.id === id);
    if (idx === -1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = sectionRefs.current[idx];
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const activeCategory = CATEGORIES[activeIndex];

  return (
    <main className="relative">
      <Navbar activeCategory={activeCategory} onNavigate={jumpTo} />

      {/* Cross-fading themed backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at 20% 10%, rgba(${activeCategory.themeRgb.join(
              ',',
            )},0.18), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(${activeCategory.themeRgbSecondary.join(
              ',',
            )},0.10), transparent 60%), linear-gradient(180deg, #05070d 0%, #03050a 100%)`,
          }}
        />
      </AnimatePresence>

      {/* === HERO: canvas scrollytelling with 96 frames + animated text === */}
      <HeroScrolly onAllLoaded={() => setHeroLoaded(true)} />

      {/* Below-the-fold mounts only after every hero frame is buffered. */}
      <AnimatePresence>
        {heroLoaded && (
          <motion.div
            key="below-the-fold"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroBannerAd />
            {CATEGORIES.map((c, i) => (
              <CategorySection
                key={c.id}
                category={c}
                index={i}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
              />
            ))}
            <Footer />
            <CategoryDeck activeCategory={activeCategory} onJump={jumpTo} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
