'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { AUTH_COPY, NAV_LINKS, CATEGORIES, type Category } from '@/data/content';
import AuthModal from './AuthModal';

interface Props {
  activeCategory: Category;
  onNavigate: (id: string) => void;
}

export default function Navbar({ activeCategory, onNavigate }: Props) {
  const { lang, toggle } = useLang();
  const { user, signOut, configured } = useAuth();
  const auth = AUTH_COPY[lang];

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Click-away for account dropdown
  useEffect(() => {
    if (!accountOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setAccountOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [accountOpen]);

  const initials = (user?.email ?? '?').slice(0, 2).toUpperCase();

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 ease-out sm:px-6 lg:px-10
            ${scrolled ? 'mt-3' : 'mt-5'}`}
        >
          <div
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-2xl transition-all duration-500 sm:px-6
              ${scrolled ? 'bg-black/60 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]' : 'bg-black/30'}`}
            style={{
              borderColor: `rgba(${activeCategory.themeRgb.join(',')}, 0.28)`,
              boxShadow: scrolled
                ? `0 0 0 1px rgba(${activeCategory.themeRgb.join(',')}, 0.15)`
                : undefined,
            }}
          >
            {/* Brand */}
            <button
              onClick={() => onNavigate(CATEGORIES[0].id)}
              className="group flex items-center gap-3"
              aria-label="Lutakon Satama — Home"
            >
              <BrandMark color={activeCategory.themeColor} />
              <div className="flex flex-col items-start leading-tight">
                <span className="font-display text-base font-extrabold tracking-tight text-white sm:text-lg">
                  Lutakon Satama
                </span>
                <span className="text-[0.62rem] uppercase tracking-[0.32em] text-white/55">
                  {lang === 'fi' ? 'Jyväskylän sydän' : 'Heart of Jyväskylä'}
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const active = link.key === activeCategory.id;
                return (
                  <button
                    key={link.key}
                    onClick={() => onNavigate(link.key)}
                    className="relative rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, rgba(${activeCategory.themeRgb.join(',')},0.18), rgba(${activeCategory.themeRgbSecondary.join(',')},0.10))`,
                          boxShadow: `inset 0 0 0 1px rgba(${activeCategory.themeRgb.join(',')},0.4)`,
                        }}
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      />
                    )}
                    <span className="relative">{lang === 'fi' ? link.fi : link.en}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="group inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/75 hover:border-white/30 hover:text-white"
                aria-label="Toggle language"
              >
                <span className={lang === 'fi' ? 'text-white' : 'text-white/40'}>FI</span>
                <span className="opacity-40">/</span>
                <span className={lang === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
              </button>

              {/* Auth control: Sign-in OR Account menu */}
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setAccountOpen((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-3 text-xs font-semibold text-white hover:border-white/30"
                    aria-haspopup="menu"
                    aria-expanded={accountOpen}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 text-[0.6rem] font-bold text-black">
                      {initials}
                    </span>
                    <span className="hidden uppercase tracking-[0.28em] sm:inline">{auth.accountMenu}</span>
                  </button>

                  <AnimatePresence>
                    {accountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#080c14]/95 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
                        role="menu"
                      >
                        <div className="px-3 py-3">
                          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/45">
                            {auth.accountMenu}
                          </p>
                          <p className="mt-1 truncate text-sm font-semibold text-white" title={user.email ?? ''}>
                            {user.email}
                          </p>
                        </div>
                        <div className="h-px bg-white/10" />
                        <button
                          type="button"
                          onClick={async () => {
                            setAccountOpen(false);
                            await signOut();
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-white/85 hover:bg-white/5 hover:text-white"
                          role="menuitem"
                        >
                          <span>{auth.signOut}</span>
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 12H3" />
                            <path d="M9 6l-6 6 6 6" />
                            <path d="M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
                          </svg>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:border-white/30 sm:px-4"
                  title={configured ? auth.open : auth.notConfigured}
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                  </svg>
                  <span className="hidden sm:inline">{auth.open}</span>
                </button>
              )}

              <a
                href="#footer"
                className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.02]"
                style={{ background: activeCategory.gradient }}
              >
                <span>{lang === 'fi' ? 'Tutki tapahtumia' : 'Explore Events'}</span>
                <Arrow />
              </a>

              <button
                onClick={() => setOpen((o) => !o)}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white md:hidden"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                <Burger open={open} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 md:hidden"
            >
              <div className="rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-2xl">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.key}
                    onClick={() => {
                      setOpen(false);
                      onNavigate(link.key);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    <span>{lang === 'fi' ? link.fi : link.en}</span>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          link.key === activeCategory.id ? activeCategory.themeColor : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  </button>
                ))}
                {!user && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setAuthOpen(true);
                    }}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white"
                  >
                    {auth.open}
                  </button>
                )}
                <a
                  href="#footer"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black"
                  style={{ background: activeCategory.gradient }}
                >
                  {lang === 'fi' ? 'Tutki tapahtumia' : 'Explore Events'}
                  <Arrow />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

/* ---------- Brand mark: abstract wave/anchor ---------- */
function BrandMark({ color }: { color: string }) {
  return (
    <span
      className="relative grid h-10 w-10 place-items-center rounded-xl border"
      style={{
        borderColor: 'rgba(255,255,255,0.18)',
        background: `radial-gradient(circle at 30% 30%, ${color}26, transparent 65%)`,
      }}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M3 21c3-2 5-2 8 0s5 2 8 0 5-2 8 0" />
        <path d="M16 6v16" />
        <circle cx="16" cy="6" r="2" fill={color} stroke="none" />
        <path d="M11 16h10" />
      </svg>
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}
