'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { DASHBOARD_COPY, type DashboardTab } from '@/data/dashboard';
import AuthModal from '@/components/AuthModal';
import DashboardShell from '@/components/dashboard/DashboardShell';
import SectionOverview from '@/components/dashboard/SectionOverview';
import SectionActivities from '@/components/dashboard/SectionActivities';
import SectionSauna from '@/components/dashboard/SectionSauna';
import SectionBookings from '@/components/dashboard/SectionBookings';
import SectionProfile from '@/components/dashboard/SectionProfile';

const VALID_TABS: DashboardTab[] = ['overview', 'activities', 'sauna', 'bookings', 'profile'];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { lang } = useLang();
  const t = DASHBOARD_COPY[lang];

  const [tab, setTab] = useState<DashboardTab>('overview');
  /** Bumped after creating/cancelling a booking so the list refreshes. */
  const [refreshKey, setRefreshKey] = useState(0);
  const [authOpen, setAuthOpen] = useState(false);

  // Read/write the active tab in the URL hash so users can deep-link.
  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '') as DashboardTab;
    if (VALID_TABS.includes(fromHash)) setTab(fromHash);
  }, []);
  useEffect(() => {
    const hash = `#${tab}`;
    if (window.location.hash !== hash) {
      window.history.replaceState({}, '', `/dashboard/${hash}`);
    }
  }, [tab]);

  const onBooked = () => setRefreshKey((k) => k + 1);

  // ---------- Loading state ----------
  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center text-sm text-white/60">
        {t.common.loading}
      </main>
    );
  }

  // ---------- Unauthenticated guard ----------
  if (!user) {
    return (
      <>
        <main className="relative grid min-h-screen place-items-center px-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(circle at 70% 80%, rgba(163,230,53,0.12), transparent 60%), linear-gradient(180deg, #05070d, #03050a)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#080c14]/85 p-8 text-center backdrop-blur-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.4em] text-cyan-300">
              Lutakon Satama
            </span>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
              {t.guard.title}
            </h1>
            <p className="mt-2 text-sm text-white/65">{t.guard.sub}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black"
              >
                {t.guard.open}
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:border-white/30"
              >
                {t.common.backToSite}
              </Link>
            </div>
          </motion.div>
        </main>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  // ---------- Authenticated ----------
  return (
    <DashboardShell activeTab={tab} onTabChange={setTab}>
      {tab === 'overview'   && <SectionOverview   onJump={setTab} refreshKey={refreshKey} />}
      {tab === 'activities' && <SectionActivities onBooked={onBooked} />}
      {tab === 'sauna'      && <SectionSauna      onBooked={onBooked} />}
      {tab === 'bookings'   && <SectionBookings   refreshKey={refreshKey} />}
      {tab === 'profile'    && <SectionProfile />}
    </DashboardShell>
  );
}
