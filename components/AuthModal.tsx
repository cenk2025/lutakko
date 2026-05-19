'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { AUTH_COPY, type Lang } from '@/data/content';

type Tab = 'signIn' | 'signUp' | 'magic';

interface Props {
  open: boolean;
  onClose: () => void;
  initialTab?: Tab;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({ open, onClose, initialTab = 'signIn' }: Props) {
  const { lang } = useLang();
  const t = AUTH_COPY[lang];
  const { configured, signIn, signUp, signInWithMagicLink, user } = useAuth();

  const [tab, setTab] = useState<Tab>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  // Reset state every time the modal opens
  useEffect(() => {
    if (!open) return;
    setTab(initialTab);
    setEmail('');
    setPassword('');
    setError(null);
    setNotice(null);
    setBusy(false);
    // Focus email after the entrance animation
    const id = window.setTimeout(() => emailRef.current?.focus(), 220);
    return () => window.clearTimeout(id);
  }, [open, initialTab]);

  // Close automatically once signed in
  useEffect(() => {
    if (open && user) {
      const id = window.setTimeout(onClose, 600);
      return () => window.clearTimeout(id);
    }
  }, [user, open, onClose]);

  // Esc-to-close + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  const validate = useCallback(
    (needsPassword: boolean): string | null => {
      if (!email || (needsPassword && !password)) return t.fields.missing;
      if (!EMAIL_RE.test(email)) return t.fields.badEmail;
      if (needsPassword && password.length < 8) return t.fields.shortPassword;
      return null;
    },
    [email, password, t.fields],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!configured) {
      setError(t.notConfigured);
      return;
    }

    const validation = validate(tab !== 'magic');
    if (validation) {
      setError(validation);
      return;
    }

    setBusy(true);
    try {
      if (tab === 'signIn') {
        const { error: err } = await signIn(email, password);
        if (err) setError(humanise(err, lang, t.notConfigured));
      } else if (tab === 'signUp') {
        const { error: err, needsEmailConfirm } = await signUp(email, password);
        if (err) setError(humanise(err, lang, t.notConfigured));
        else if (needsEmailConfirm) setNotice(t.needConfirm);
      } else {
        const { error: err } = await signInWithMagicLink(email);
        if (err) setError(humanise(err, lang, t.notConfigured));
        else setNotice(t.needMagic);
      }
    } finally {
      setBusy(false);
    }
  };

  const submitLabel = useMemo(() => {
    if (tab === 'signUp') return t.submitSignUp;
    if (tab === 'magic') return t.submitMagic;
    return t.submitSignIn;
  }, [tab, t]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="auth-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#080c14]/95 p-7 backdrop-blur-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:p-9"
          >
            {/* Themed corner glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
              style={{ background: 'rgba(34,211,238,0.25)' }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl"
              style={{ background: 'rgba(163,230,53,0.16)' }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.4em] text-cyan-300">
                Lutakko.info
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                {t.title}
              </h2>
              <p className="mt-2 text-sm text-white/65">{t.sub}</p>

              {/* Tabs */}
              <div className="mt-6 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-xs">
                {(['signIn', 'signUp', 'magic'] as Tab[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setTab(id);
                      setError(null);
                      setNotice(null);
                    }}
                    className="relative flex-1 rounded-full px-3 py-2 font-semibold text-white/65 transition-colors hover:text-white"
                    aria-pressed={tab === id}
                  >
                    {tab === id && (
                      <motion.span
                        layoutId="auth-tab-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      />
                    )}
                    <span className={`relative ${tab === id ? 'text-black' : ''}`}>
                      {id === 'signIn' ? t.tabSignIn : id === 'signUp' ? t.tabSignUp : t.tabMagic}
                    </span>
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/55">
                    {t.email}
                  </span>
                  <input
                    ref={emailRef}
                    type="email"
                    autoComplete="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-cyan-400/60 focus:bg-white/[0.08]"
                    required
                  />
                </label>

                {tab !== 'magic' && (
                  <label className="block">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/55">
                      {t.password}
                    </span>
                    <input
                      type="password"
                      autoComplete={tab === 'signIn' ? 'current-password' : 'new-password'}
                      placeholder={t.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-cyan-400/60 focus:bg-white/[0.08]"
                      required
                      minLength={8}
                    />
                  </label>
                )}

                {tab === 'magic' && (
                  <p className="text-xs text-white/55">{t.magicHint}</p>
                )}

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs text-rose-200"
                    >
                      {error}
                    </motion.p>
                  )}
                  {notice && !error && (
                    <motion.p
                      key="notice"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200"
                    >
                      {notice}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={busy}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.01] disabled:cursor-progress disabled:opacity-70"
                >
                  {busy ? (
                    <Spinner />
                  ) : (
                    <>
                      {submitLabel}
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>

                {!configured && (
                  <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-[0.7rem] text-amber-200">
                    {t.notConfigured}
                  </p>
                )}

                <p className="pt-2 text-center text-[0.65rem] leading-relaxed text-white/45">
                  {t.legal}
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 3a9 9 0 0 1 9 9" />
      <path opacity="0.3" d="M12 21a9 9 0 0 1-9-9" />
    </svg>
  );
}

/**
 * Map a few common Supabase auth error messages into something nicer for the
 * UI. Unknown errors pass through unchanged so the user still sees the cause.
 */
function humanise(msg: string, lang: Lang, notConfiguredCopy: string): string {
  if (msg === 'auth-not-configured') return notConfiguredCopy;
  if (/invalid login credentials/i.test(msg)) {
    return lang === 'fi'
      ? 'Tunnukset eivät täsmänneet. Tarkista sähköposti ja salasana.'
      : 'Those credentials did not match. Double-check email and password.';
  }
  if (/user already registered/i.test(msg)) {
    return lang === 'fi'
      ? 'Tämä sähköposti on jo rekisteröity. Kokeile kirjautua sisään.'
      : 'That email is already registered. Try signing in instead.';
  }
  return msg;
}
