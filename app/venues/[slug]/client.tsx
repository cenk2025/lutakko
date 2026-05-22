'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { getVenue } from '@/data/venues';
import SmartImage from '@/components/SmartImage';
import HeroBannerAd from '@/components/ads/HeroBannerAd';

interface Props {
  slug: string;
}

export default function VenuePageClient({ slug }: Props) {
  const { lang, toggle } = useLang();
  const venue = getVenue(slug);

  if (!venue) {
    return (
      <main className="grid min-h-screen place-items-center text-white/60">
        Not found
      </main>
    );
  }

  const t = venue[lang];
  const themed = `rgba(${venue.themeRgb.join(',')},`;

  return (
    <main className="relative pb-32">
      {/* Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 20% 10%, ${themed}0.18), transparent 55%), radial-gradient(circle at 80% 90%, ${themed}0.10), transparent 60%), linear-gradient(180deg, #05070d 0%, #03050a 100%)`,
        }}
      />

      {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 sm:px-10 sm:pt-12 lg:px-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/85 hover:border-white/30"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M11 18l-6-6 6-6" />
          </svg>
          {lang === 'fi' ? 'Etusivulle' : 'Home'}
        </Link>
        <button
          onClick={toggle}
          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/75 hover:border-white/30 hover:text-white"
        >
          <span className={lang === 'fi' ? 'text-white' : 'text-white/40'}>FI</span>
          <span className="opacity-40">/</span>
          <span className={lang === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 sm:px-10 sm:pt-16 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]"
        >
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.4em]"
              style={{
                borderColor: `${themed}0.35)`,
                color: venue.themeColor,
                background: `${themed}0.08)`,
              }}
            >
              {t.hero.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tightest text-white">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-light text-white/85 sm:text-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {venue.url && (
                <a
                  href={venue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black"
                  style={{ background: `linear-gradient(135deg, ${venue.themeColor}, #a3e635)` }}
                >
                  {lang === 'fi' ? 'Avaa sivusto' : 'Open website'}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              )}
              <a
                href="#claim"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:border-white/40"
              >
                {lang === 'fi' ? 'Liity kumppaniksi' : 'Become a partner'}
              </a>
            </div>
          </div>

          {/* Hero image */}
          <SmartImage
            src={venue.image ?? ''}
            alt={t.hero.title}
            fallbackRgb={venue.themeRgb}
            className="aspect-[5/4] w-full rounded-[28px] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
            loading="eager"
          />
        </motion.div>
      </section>

      {/* Sponsor banner */}
      <div className="mt-16">
        <HeroBannerAd />
      </div>

      {/* About + facts */}
      <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-2xl font-light tracking-tight text-white sm:text-3xl">
            {lang === 'fi' ? 'Tietoa' : 'About'}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/85 sm:text-lg">
            {t.about}
          </p>

          <h3 className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/55">
            {lang === 'fi' ? 'Kohokohdat' : 'Highlights'}
          </h3>
          <ul className="mt-3 space-y-2">
            {t.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                <span
                  className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-semibold"
                  style={{
                    background: `${themed}0.16)`,
                    color: venue.themeColor,
                    border: `1px solid ${themed}0.35)`,
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-base font-light leading-relaxed text-white/90 sm:text-lg">{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-white/55">
            {lang === 'fi' ? 'Käytännön tiedot' : 'Key info'}
          </p>
          <dl className="mt-4 space-y-4">
            {venue.facts.map((f, i) => (
              <div key={i} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                <dt className="text-[0.65rem] uppercase tracking-[0.32em] text-white/50">
                  {f[lang].label}
                </dt>
                <dd className="mt-1 text-base font-light text-white sm:text-lg">{f[lang].value}</dd>
              </div>
            ))}

            {(venue.address || venue.phone || venue.email) && (
              <div className="border-t border-white/5 pt-4">
                <dt className="text-[0.65rem] uppercase tracking-[0.32em] text-white/50">
                  {lang === 'fi' ? 'Yhteystiedot' : 'Contact'}
                </dt>
                {venue.address && <dd className="mt-1 text-sm font-light text-white/85">{venue.address}</dd>}
                {venue.phone && (
                  <dd className="mt-1 text-sm font-light text-white/85">
                    <a href={`tel:${venue.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                      {venue.phone}
                    </a>
                  </dd>
                )}
                {venue.email && (
                  <dd className="mt-1 text-sm font-light text-white/85">
                    <a href={`mailto:${venue.email}`} className="hover:text-white">
                      {venue.email}
                    </a>
                  </dd>
                )}
              </div>
            )}
          </dl>
        </motion.aside>
      </section>

      {/* Claim / partnership CTA */}
      <ClaimSection slug={venue.slug} pitch={t.pitch} themeRgb={venue.themeRgb} />
    </main>
  );
}

/* ----- Inline lead-capture form ----- */
function ClaimSection({
  slug,
  pitch,
  themeRgb,
}: {
  slug: string;
  pitch: string;
  themeRgb: [number, number, number];
}) {
  const { lang } = useLang();
  const [name, setName]   = useState('');
  const [org, setOrg]     = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote]   = useState('');

  const subject = encodeURIComponent(`Lutakon Satama · listing request: ${slug}`);
  const body = encodeURIComponent(
    `Slug: ${slug}\nName: ${name}\nOrganisation: ${org}\nEmail: ${email}\n\n${note}`,
  );
  const mailto = `mailto:business@lutakko.info?subject=${subject}&body=${body}`;

  const isFi = lang === 'fi';

  return (
    <section id="claim" className="mx-auto mt-16 max-w-6xl px-6 sm:px-10 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-3xl border p-8 backdrop-blur sm:p-10"
        style={{
          borderColor: `rgba(${themeRgb.join(',')},0.3)`,
          background: `linear-gradient(140deg, rgba(${themeRgb.join(',')},0.10), rgba(255,255,255,0.02))`,
        }}
      >
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.4em]"
          style={{
            borderColor: `rgba(${themeRgb.join(',')},0.4)`,
            color: `rgb(${themeRgb.join(',')})`,
            background: `rgba(${themeRgb.join(',')},0.10)`,
          }}
        >
          {isFi ? 'Sponsorit & kumppanit' : 'Partners & sponsors'}
        </span>
        <h2 className="mt-4 font-display text-2xl font-light leading-tight text-white sm:text-3xl">
          {isFi ? 'Liity sivuston kumppaniksi' : 'Become a partner on this page'}
        </h2>
        <p className="mt-3 max-w-3xl text-base font-light text-white/80 sm:text-lg">{pitch}</p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Field label={isFi ? 'Yhteyshenkilö' : 'Contact name'}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>
          <Field label={isFi ? 'Yritys / organisaatio' : 'Company / organisation'}>
            <input
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>
          <Field label={isFi ? 'Sähköposti' : 'Email'} full>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>
          <Field label={isFi ? 'Viesti' : 'Message'} full>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={
                isFi
                  ? 'Kuvaile yhteistyötarpeesi (paketti, ajanjakso, näkyvyys…)'
                  : 'Describe the partnership you have in mind (package, period, visibility…)'
              }
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black"
          >
            {isFi ? 'Lähetä kumppanikysely' : 'Send partnership enquiry'}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
          <span className="text-xs font-light text-white/55">
            {isFi ? 'tai suoraan ' : 'or directly '}
            <a href="mailto:business@lutakko.info" className="underline-offset-4 hover:underline">
              business@lutakko.info
            </a>
          </span>
        </div>
      </motion.div>
    </section>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/55">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
