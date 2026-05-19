'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { CATEGORIES, FOOTER_LINKS, NAV_LINKS, SITE_META } from '@/data/content';

export default function Footer() {
  const { lang } = useLang();
  const f = FOOTER_LINKS[lang];
  const meta = SITE_META[lang];

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#05070d] to-[#03050a] pt-20"
      id="footer"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(163,230,53,0.4), transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60%] opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.18), transparent 60%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">

          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5"
              >
                <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 21c3-2 5-2 8 0s5 2 8 0 5-2 8 0" />
                  <path d="M16 6v16" />
                  <circle cx="16" cy="6" r="2" fill="#a3e635" stroke="none" />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-white">{meta.name}</h3>
                <p className="text-[0.7rem] uppercase tracking-[0.32em] text-white/60">
                  {f.location}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{meta.tagline}</p>

            {/* Interactive map preview link */}
            <a
              href="https://www.google.com/maps/place/Lutakko,+Jyv%C3%A4skyl%C3%A4/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <MiniMap />
              <div>
                <p className="text-sm font-semibold text-white">
                  {lang === 'fi' ? 'Avaa kartta' : 'Open map'}
                </p>
                <p className="text-xs text-white/55">Satamakatu 8 · 40100 Jyväskylä</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                className="ml-auto h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1"
                fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </a>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-white/55">
              {f.explore}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={`#${link.key}`}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {lang === 'fi' ? link.fi : link.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-white/55">
              {f.plan}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: c.themeColor }}
                    />
                    {c.fi.title /* always show FI primary for cultural feel */}{' '}
                    <span className="text-white/40">·</span> {c.en.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://visitjyvaskyla.fi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {lang === 'fi' ? 'Visit Jyväskylä' : 'Visit Jyväskylä'}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-white/55">
              {f.follow}
            </h4>
            <p className="mt-5 font-display text-lg font-bold text-white">{f.newsletter.title}</p>
            <p className="mt-2 text-sm text-white/65">{f.newsletter.desc}</p>

            <form
              onSubmit={onSubmit}
              className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={f.newsletter.placeholder}
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.02]"
              >
                {f.newsletter.button}
              </button>
            </form>

            <motion.p
              initial={false}
              animate={{ opacity: submitted ? 1 : 0, y: submitted ? 0 : -4 }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-xs text-emerald-300"
            >
              {lang === 'fi' ? 'Kiitos! Tilauksesi on rekisteröity.' : 'Thanks! You are on the list.'}
            </motion.p>

            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="https://instagram.com" label="Instagram"><InstagramGlyph /></SocialLink>
              <SocialLink href="https://www.facebook.com" label="Facebook"><FacebookGlyph /></SocialLink>
              <SocialLink href="https://www.tiktok.com" label="TikTok"><TiktokGlyph /></SocialLink>
            </div>
          </div>
        </div>

        {/* Lower band */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pb-10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {meta.name}. {f.rights}
          </p>
          <p className="text-white/60">
            {lang === 'fi' ? 'Toteuttaja ' : 'Operated by '}
            <a
              className="text-white/85 underline-offset-4 hover:underline"
              href="https://voon.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voon IQ
            </a>
            <span className="text-white/40"> · </span>
            <a
              className="text-white/75 underline-offset-4 hover:underline"
              href="mailto:info@voon.fi"
            >
              info@voon.fi
            </a>
            {lang === 'fi'
              ? ' — sydämellä Jyväskylässä.'
              : ' — with love in Jyväskylä.'}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Bits ---------- */
function MiniMap() {
  return (
    <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-white/10 bg-[#070b14]">
      <svg viewBox="0 0 48 48" className="h-12 w-12">
        <defs>
          <linearGradient id="water" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" fill="url(#water)" />
        <path d="M6 30 L18 22 L26 28 L34 18 L46 24" stroke="#a3e635" strokeWidth="1.2" fill="none" />
        <circle cx="26" cy="28" r="2.2" fill="#a3e635" />
        <circle cx="26" cy="28" r="6" fill="none" stroke="#a3e635" strokeOpacity="0.4" />
      </svg>
    </span>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white/30 hover:text-white"
    >
      {children}
    </a>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.7-1.6h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V14h2.7v8h3.1z" />
    </svg>
  );
}
function TiktokGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M16 3c.4 1.7 1.6 3.1 3.3 3.6V9c-1.4-.1-2.6-.5-3.8-1.2v6.6c0 4-3.2 6.6-6.4 6.6-2.7 0-5.1-1.9-5.6-4.6-.5-2.9 1.4-5.8 4.2-6.4.7-.2 1.3-.2 1.9-.1v3a3.4 3.4 0 0 0-1.7 0 2.4 2.4 0 0 0-1.4 3.7 2.5 2.5 0 0 0 4.7-1V3H16z" />
    </svg>
  );
}
