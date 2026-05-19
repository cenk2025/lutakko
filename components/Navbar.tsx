'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import {
  AUTH_COPY,
  CATEGORIES,
  NAV_MENU,
  navGroupForSlug,
  type Category,
  type NavMenuGroup,
} from '@/data/content';
import AuthModal from './AuthModal';

interface Props {
  activeCategory: Category;
  onNavigate: (id: string) => void;
}

export default function Navbar({ activeCategory, onNavigate }: Props) {
  const { lang, toggle } = useLang();
  const { user, signOut, configured } = useAuth();
  const auth = AUTH_COPY[lang];
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navRef     = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close popovers on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (openMenu && !navRef.current?.contains(e.target as Node)) setOpenMenu(null);
      if (accountOpen && !accountRef.current?.contains(e.target as Node)) setAccountOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu, accountOpen]);

  // Highlight the menu group of the current /venues/<slug> page (if any).
  const slug = pathname?.match(/\/venues\/([^/]+)/)?.[1] ?? null;
  const activeMenuKey = navGroupForSlug(slug)?.key ?? null;

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
            ref={navRef}
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
            <Link
              href="/"
              onClick={() => {
                setOpenMenu(null);
                if (pathname === '/') onNavigate(CATEGORIES[0].id);
              }}
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
            </Link>

            {/* Desktop nav — dropdowns */}
            <nav className="hidden items-center gap-1 md:flex">
              {NAV_MENU.map((group) => (
                <DropdownTrigger
                  key={group.key}
                  group={group}
                  isOpen={openMenu === group.key}
                  isActive={activeMenuKey === group.key}
                  activeColor={activeCategory.themeColor}
                  activeRgb={activeCategory.themeRgb}
                  onToggle={() =>
                    setOpenMenu((current) => (current === group.key ? null : group.key))
                  }
                  onClose={() => setOpenMenu(null)}
                  lang={lang}
                />
              ))}
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

              {/* Auth control */}
              {user ? (
                <div className="relative" ref={accountRef}>
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
                          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/45">{auth.accountMenu}</p>
                          <p className="mt-1 truncate text-sm font-semibold text-white" title={user.email ?? ''}>
                            {user.email}
                          </p>
                        </div>
                        <div className="h-px bg-white/10" />
                        <Link
                          href="/dashboard/"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-white/85 hover:bg-white/5 hover:text-white"
                          role="menuitem"
                        >
                          <span>{lang === 'fi' ? 'Hallintapaneeli' : 'Dashboard'}</span>
                          <Arrow />
                        </Link>
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

              {/* Mobile burger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white md:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <Burger open={mobileOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 md:hidden"
            >
              <div className="rounded-2xl border border-white/10 bg-black/85 p-3 backdrop-blur-2xl">
                {NAV_MENU.map((group) => (
                  <MobileGroup
                    key={group.key}
                    group={group}
                    lang={lang}
                    onItemClick={() => setMobileOpen(false)}
                  />
                ))}
                {!user && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setAuthOpen(true);
                    }}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white"
                  >
                    {auth.open}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

/* ---------- Desktop dropdown trigger + panel ---------- */

interface DropdownProps {
  group: NavMenuGroup;
  isOpen: boolean;
  isActive: boolean;
  activeColor: string;
  activeRgb: [number, number, number];
  onToggle: () => void;
  onClose: () => void;
  lang: 'fi' | 'en';
}

function DropdownTrigger({
  group,
  isOpen,
  isActive,
  activeColor,
  activeRgb,
  onToggle,
  onClose,
  lang,
}: DropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {isActive && (
          <motion.span
            layoutId="nav-pill"
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, rgba(${activeRgb.join(',')},0.20), rgba(255,255,255,0.04))`,
              boxShadow: `inset 0 0 0 1px rgba(${activeRgb.join(',')},0.4)`,
            }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
          />
        )}
        <span className="relative">{group[lang]}</span>
        <svg
          viewBox="0 0 24 24"
          className={`relative h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#080c14]/95 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            role="menu"
          >
            <p className="px-3 pb-2 pt-1 text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-white/45">
              {group[lang]}
            </p>
            {group.items.map((item) => (
              <Link
                key={item.slug}
                href={`/venues/${item.slug}/`}
                onClick={onClose}
                className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-light text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                role="menuitem"
              >
                <span>{item[lang]}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 opacity-50 transition-all group-hover/item:translate-x-1 group-hover/item:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: activeColor }}
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Mobile accordion group ---------- */

function MobileGroup({
  group,
  lang,
  onItemClick,
}: {
  group: NavMenuGroup;
  lang: 'fi' | 'en';
  onItemClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-white"
        aria-expanded={open}
      >
        <span>{group[lang]}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-2 pl-3">
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/venues/${item.slug}/`}
                  onClick={onItemClick}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-light text-white/85 hover:bg-white/5 hover:text-white"
                >
                  <span>{item[lang]}</span>
                  <Arrow />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Brand mark ---------- */
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
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
