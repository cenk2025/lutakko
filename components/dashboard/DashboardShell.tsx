'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { DASHBOARD_COPY, type DashboardTab } from '@/data/dashboard';

interface Props {
  activeTab: DashboardTab;
  onTabChange: (t: DashboardTab) => void;
  children: React.ReactNode;
}

const BASE_TABS: { id: DashboardTab; icon: React.ReactNode }[] = [
  { id: 'overview',   icon: <DotsIcon /> },
  { id: 'activities', icon: <SportsIcon /> },
  { id: 'sauna',      icon: <SaunaIcon /> },
  { id: 'calendar',   icon: <CalendarIcon /> },
  { id: 'bookings',   icon: <ListIcon /> },
  { id: 'profile',    icon: <UserIcon /> },
];

const ADMIN_TABS: { id: DashboardTab; icon: React.ReactNode }[] = [
  { id: 'ads',        icon: <AdIcon /> },
];

export default function DashboardShell({ activeTab, onTabChange, children }: Props) {
  const { lang, toggle } = useLang();
  const { user, signOut, isAdmin } = useAuth();
  const t = DASHBOARD_COPY[lang];

  const TABS = isAdmin ? [...BASE_TABS, ...ADMIN_TABS] : BASE_TABS;

  return (
    <div className="relative min-h-screen pb-20">
      {/* Themed backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 15% 5%, rgba(34,211,238,0.15), transparent 55%), radial-gradient(circle at 85% 95%, rgba(163,230,53,0.10), transparent 60%), linear-gradient(180deg, #05070d 0%, #03050a 100%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-8 sm:pt-12 lg:px-12">
        {/* Header bar */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label="Lutakon Satama — Home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
              <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round">
                <path d="M3 21c3-2 5-2 8 0s5 2 8 0 5-2 8 0" />
                <path d="M16 6v16" />
                <circle cx="16" cy="6" r="2" fill="#a3e635" stroke="none" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="font-display text-base font-extrabold text-white sm:text-lg">
                Lutakko.info
              </p>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/55">
                {t.title}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/75 hover:border-white/30 hover:text-white"
            >
              <span className={lang === 'fi' ? 'text-white' : 'text-white/40'}>FI</span>
              <span className="opacity-40">/</span>
              <span className={lang === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/85 hover:border-white/30"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M11 18l-6-6 6-6" />
              </svg>
              <span className="hidden sm:inline">{t.common.backToSite}</span>
            </Link>

            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-black"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 12H3" />
                <path d="M9 6l-6 6 6 6" />
                <path d="M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
              </svg>
              <span className="hidden sm:inline">{t.common.signOut}</span>
            </button>
          </div>
        </header>

        {/* Title block */}
        <section className="mt-10 grid items-end gap-4 sm:flex sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.4em] text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {user?.email ?? ''}
            </span>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[0.98] tracking-tightest text-white">
              {t.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">{t.sub}</p>
          </div>
        </section>

        {/* Tabs */}
        <nav
          className="no-scrollbar mt-8 -mx-2 flex items-center gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur"
          role="tablist"
        >
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(tab.id)}
                className="relative inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white/65 transition-colors hover:text-white"
              >
                {active && (
                  <motion.span
                    layoutId="dashboard-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-lime-400"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                <span className={`relative inline-flex items-center gap-2 ${active ? 'text-black' : ''}`}>
                  {tab.icon}
                  <span className="uppercase tracking-[0.18em]">{t.tabs[tab.id]}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Tab content */}
        <main className="mt-8">{children}</main>
      </div>
    </div>
  );
}

/* -------- inline icons -------- */
function DotsIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
      <circle cx="4"  cy="10" r="1.6" />
      <circle cx="10" cy="10" r="1.6" />
      <circle cx="16" cy="10" r="1.6" />
    </svg>
  );
}
function SportsIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3v14M5 5l10 10" />
    </svg>
  );
}
function SaunaIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="3" y="6" width="14" height="10" rx="1.5" />
      <path d="M7 10v3M10 10v3M13 10v3" />
      <path d="M6 3c0 1 1 1 1 2s-1 1-1 2M10 3c0 1 1 1 1 2s-1 1-1 2M14 3c0 1 1 1 1 2s-1 1-1 2" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6h10M6 10h10M6 14h10" />
      <circle cx="3.5" cy="6"  r="0.8" fill="currentColor" />
      <circle cx="3.5" cy="10" r="0.8" fill="currentColor" />
      <circle cx="3.5" cy="14" r="0.8" fill="currentColor" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="10" cy="7" r="3" />
      <path d="M3 17a7 7 0 0 1 14 0" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="14" height="12" rx="1.5" />
      <path d="M3 9h14" />
      <path d="M7 3v4M13 3v4" />
    </svg>
  );
}
function AdIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h14v10H3z" />
      <path d="M6 9h8M6 12h5" />
      <circle cx="15.5" cy="4.5" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
