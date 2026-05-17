'use client';

import { motion } from 'framer-motion';
import { CATEGORIES, type Category } from '@/data/content';
import { useLang } from '@/context/LanguageContext';

interface Props {
  activeCategory: Category;
  onJump: (id: string) => void;
}

/**
 * Fixed bottom pill-shaped navigation deck (desktop) + sidebar dots (mobile)
 * for direct jumps across the 3 main categories.
 */
export default function CategoryDeck({ activeCategory, onJump }: Props) {
  const { lang } = useLang();

  return (
    <>
      {/* Desktop deck */}
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block"
        aria-label="Section navigation"
      >
        <div
          className="flex items-center gap-1 rounded-full border border-white/10 bg-black/55 px-1.5 py-1.5 backdrop-blur-2xl"
          style={{
            boxShadow: `0 30px 80px -30px rgba(${activeCategory.themeRgb.join(',')},0.5)`,
          }}
        >
          {CATEGORIES.map((c) => {
            const active = c.id === activeCategory.id;
            return (
              <button
                key={c.id}
                onClick={() => onJump(c.id)}
                className="relative rounded-full px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:text-white"
                aria-pressed={active}
              >
                {active && (
                  <motion.span
                    layoutId="deck-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: c.gradient }}
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                  />
                )}
                <span className={`relative inline-flex items-center gap-2 ${active ? 'text-black' : ''}`}>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: active ? 'rgba(0,0,0,0.65)' : c.themeColor }}
                  />
                  {c.navLabel[lang]}
                </span>
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile sidebar dots */}
      <motion.nav
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed right-3 top-1/2 z-40 -translate-y-1/2 md:hidden"
        aria-label="Section navigation (compact)"
      >
        <div className="flex flex-col items-center gap-2 rounded-full border border-white/10 bg-black/55 p-2 backdrop-blur-xl">
          {CATEGORIES.map((c) => {
            const active = c.id === activeCategory.id;
            return (
              <button
                key={c.id}
                onClick={() => onJump(c.id)}
                aria-label={c.navLabel[lang]}
                className="grid h-7 w-7 place-items-center rounded-full transition-transform hover:scale-110"
              >
                <span
                  className={`block rounded-full transition-all ${active ? 'h-3 w-3' : 'h-2 w-2'}`}
                  style={{
                    background: c.themeColor,
                    boxShadow: active ? `0 0 18px ${c.themeColor}` : 'none',
                  }}
                />
              </button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
