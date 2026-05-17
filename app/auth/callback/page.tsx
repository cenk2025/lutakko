'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { AUTH_COPY } from '@/data/content';
import { supabase } from '@/lib/supabase';

type Phase = 'working' | 'success' | 'failure';

/**
 * Static page that handles Supabase email-confirmation + magic-link redirects.
 *
 * With PKCE flow, Supabase places a `code` query param on the URL when it
 * sends users back here. We exchange that code for a session, then redirect
 * home. With implicit flow it places a token in the URL hash, and the
 * supabase-js client picks it up automatically via `detectSessionInUrl`.
 */
export default function AuthCallbackPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const t = AUTH_COPY[lang].callback;

  const [phase, setPhase] = useState<Phase>('working');

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!supabase) {
        setPhase('failure');
        return;
      }

      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const errParam = url.searchParams.get('error') ?? url.hash.includes('error');

        if (errParam && !code) {
          setPhase('failure');
          return;
        }

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (cancelled) return;
          if (error) {
            setPhase('failure');
            return;
          }
        } else {
          // Implicit flow — give the SDK a moment to read the URL hash.
          await new Promise((resolve) => setTimeout(resolve, 400));
        }

        const { data } = await supabase.auth.getSession();
        if (cancelled) return;
        setPhase(data.session ? 'success' : 'failure');

        if (data.session) {
          // Clean the URL and bounce home after a beat
          window.history.replaceState({}, '', '/auth/callback/');
          setTimeout(() => {
            if (!cancelled) window.location.replace('/');
          }, 1400);
        }
      } catch {
        if (!cancelled) setPhase('failure');
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // If the auth context catches up while we're showing the working state,
  // promote to success.
  useEffect(() => {
    if (user && phase === 'working') setPhase('success');
  }, [user, phase]);

  return (
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
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#080c14]/85 p-8 text-center backdrop-blur-2xl"
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
          {phase === 'working' && <PulseDot />}
          {phase === 'success' && <CheckIcon />}
          {phase === 'failure' && <CrossIcon />}
        </div>
        <h1 className="mt-6 font-display text-2xl font-extrabold text-white">
          {phase === 'working' && t.working}
          {phase === 'success' && t.success}
          {phase === 'failure' && t.failure}
        </h1>
        {phase !== 'working' && (
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.02]"
          >
            {t.back}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        )}
      </motion.div>
    </main>
  );
}

function PulseDot() {
  return (
    <span className="relative grid h-6 w-6 place-items-center">
      <span className="absolute h-6 w-6 animate-ping rounded-full bg-cyan-400/50" />
      <span className="relative h-3 w-3 rounded-full bg-cyan-300" />
    </span>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-rose-300" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}
