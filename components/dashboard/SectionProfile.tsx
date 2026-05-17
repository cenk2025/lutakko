'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { DASHBOARD_COPY } from '@/data/dashboard';
import { getProfile, updateProfile, type Profile } from '@/lib/profile';
import type { Lang } from '@/data/content';

export default function SectionProfile() {
  const { lang, setLang } = useLang();
  const { user, configured } = useAuth();
  const t = DASHBOARD_COPY[lang];

  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setName]   = useState('');
  const [phone, setPhone]     = useState('');
  const [pref, setPref]       = useState<Lang>(lang);

  const [loading, setLoading] = useState(true);
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setOk]      = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!configured || !user) {
        setLoading(false);
        return;
      }
      try {
        const p = await getProfile(user.id);
        if (!active) return;
        if (p) {
          setProfile(p);
          setName(p.full_name ?? '');
          setPhone(p.phone ?? '');
          setPref((p.preferred_lang as Lang) ?? lang);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [configured, user, lang]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOk(false);
    if (!configured) {
      setError(t.common.notConfigured);
      return;
    }
    setBusy(true);
    try {
      const next = await updateProfile({
        full_name: fullName.trim() || null,
        phone: phone.trim() || null,
        preferred_lang: pref,
      });
      setProfile(next);
      setOk(true);
      if (pref !== lang) setLang(pref);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      {/* Identity card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/45">{t.tabs.profile}</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-lime-400 text-sm font-bold text-black">
            {(user?.email ?? '?').slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white" title={user?.email ?? ''}>
              {user?.email ?? ''}
            </p>
            <p className="mt-1 text-xs text-white/55">
              {t.profile.memberSince}{' '}
              <span className="text-white/75">
                {profile
                  ? new Date(profile.created_at).toLocaleDateString(lang === 'fi' ? 'fi-FI' : 'en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '—'}
              </span>
            </p>
          </div>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-white/55">
          {t.profile.sub}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <h3 className="font-display text-2xl font-extrabold text-white">{t.profile.title}</h3>

        {loading ? (
          <p className="mt-4 text-sm text-white/55">{t.common.loading}</p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label={t.profile.fullName}>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
              />
            </Field>
            <Field label={t.profile.phone}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+358…"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
              />
            </Field>
            <Field label={t.profile.preferredLang}>
              <div className="flex gap-2">
                {(['fi', 'en'] as Lang[]).map((l) => {
                  const active = pref === l;
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setPref(l)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] transition-colors ${
                        active
                          ? 'border-transparent bg-gradient-to-br from-cyan-400 to-lime-400 text-black'
                          : 'border-white/15 bg-white/[0.04] text-white/75 hover:border-white/30'
                      }`}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </Field>
          </div>
        )}

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs text-rose-200"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200"
            >
              {t.common.saved}
            </motion.p>
          )}
          {!configured && (
            <motion.p
              key="cfg"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200"
            >
              {t.common.notConfigured}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={busy || loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black disabled:cursor-progress disabled:opacity-70 sm:w-auto"
        >
          {busy ? t.common.saving : t.profile.save}
        </button>
      </form>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/55">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
