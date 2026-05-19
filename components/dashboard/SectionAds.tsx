'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { DASHBOARD_COPY } from '@/data/dashboard';
import { CATEGORIES } from '@/data/content';
import {
  type Ad,
  type AdPlacement,
  type AdTier,
  type AdStatus,
  type NewAd,
  type AdUpdate,
  adStatus,
  createAd,
  deleteAd,
  listAllAds,
  updateAd,
} from '@/lib/ads';

const PLACEMENTS: AdPlacement[] = [
  'hero-banner',
  'category-card',
  'footer-banner',
  'event-takeover',
  'newsletter',
];
const TIERS: AdTier[] = ['sponsor', 'premium', 'pro', 'starter', 'free'];

type FilterKey = 'all' | AdStatus;

const STATUS_PILL: Record<AdStatus, string> = {
  live:      'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  scheduled: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30',
  expired:   'bg-white/10 text-white/55 border-white/15',
  paused:    'bg-rose-400/15 text-rose-300 border-rose-400/30',
};

export default function SectionAds() {
  const { lang } = useLang();
  const { configured, isAdmin } = useAuth();
  const t = DASHBOARD_COPY[lang];

  const [items, setItems]   = useState<Ad[]>([]);
  const [loading, setLoad]  = useState<boolean>(true);
  const [error, setError]   = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [editing, setEditing] = useState<Ad | 'new' | null>(null);

  const reload = useCallback(async () => {
    if (!configured || !isAdmin) {
      setItems([]);
      setLoad(false);
      return;
    }
    setLoad(true);
    setError(null);
    try {
      setItems(await listAllAds());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoad(false);
    }
  }, [configured, isAdmin]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const filtered = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((a) => adStatus(a) === filter);
  }, [items, filter]);

  if (!isAdmin) {
    return (
      <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-8 text-sm font-light text-amber-100">
        {t.ads.requiredOnlyAdmin}
      </div>
    );
  }

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.4em] text-cyan-300">
            {t.ads.adminBadge}
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">{t.ads.title}</h2>
          <p className="mt-2 max-w-2xl text-sm font-light text-white/75 sm:text-base">{t.ads.sub}</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {t.ads.newAd}
        </button>
      </header>

      {/* Filter pills */}
      <div className="no-scrollbar mt-6 -mx-1 flex items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1">
        {(['all', 'live', 'scheduled', 'expired', 'paused'] as FilterKey[]).map((k) => {
          const active = filter === k;
          const label = k === 'all' ? t.ads.filters.all : t.ads.filters[k];
          return (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active ? 'text-black' : 'text-white/70 hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="ads-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400"
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>

      {loading && (
        <p className="mt-8 text-sm font-light text-white/55">{t.common.loading}</p>
      )}
      {!loading && error && (
        <p className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}{' '}
          <button onClick={reload} className="ml-2 underline-offset-4 hover:underline">
            {t.common.retry}
          </button>
        </p>
      )}
      {!loading && !error && filtered.length === 0 && (
        <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-10 text-center text-sm font-light text-white/55">
          {t.ads.noAds}
        </p>
      )}

      <ul className="mt-6 grid gap-3">
        <AnimatePresence initial={false}>
          {filtered.map((ad) => (
            <AdRow
              key={ad.id}
              ad={ad}
              onEdit={() => setEditing(ad)}
              onDelete={async () => {
                if (!window.confirm(t.ads.deleteConfirm)) return;
                await deleteAd(ad.id);
                reload();
              }}
            />
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {editing && (
          <AdEditor
            initial={editing === 'new' ? null : editing}
            onClose={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              reload();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----- Single row in the list ----- */
function AdRow({ ad, onEdit, onDelete }: { ad: Ad; onEdit: () => void; onDelete: () => void }) {
  const { lang } = useLang();
  const t = DASHBOARD_COPY[lang];
  const status = adStatus(ad);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
    >
      <span className={`shrink-0 rounded-full border px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.32em] ${STATUS_PILL[status]}`}>
        {t.ads.status[status]}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-base font-light text-white sm:text-lg">{ad.title}</p>
        {ad.sponsor_name && (
          <p className="text-xs font-light text-white/55">{ad.sponsor_name}</p>
        )}
        {ad.body && (
          <p className="mt-2 line-clamp-2 text-sm font-light text-white/70">{ad.body}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/55">
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1">
            {t.ads.placement[ad.placement]}
          </span>
          {ad.target_category && (
            <span className="rounded-full bg-white/[0.06] px-2.5 py-1">{ad.target_category}</span>
          )}
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1">{t.ads.tier[ad.tier]}</span>
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1">
            P{ad.priority}
          </span>
          {ad.starts_at && (
            <span className="rounded-full bg-white/[0.06] px-2.5 py-1">
              {fmtDateTime(ad.starts_at, lang)} →
            </span>
          )}
          {ad.ends_at && (
            <span className="rounded-full bg-white/[0.06] px-2.5 py-1">
              → {fmtDateTime(ad.ends_at, lang)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/85 hover:border-white/30 hover:text-white"
        >
          {t.ads.edit}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-semibold text-rose-200 hover:border-rose-300/40"
        >
          {t.ads.delete}
        </button>
      </div>
    </motion.li>
  );
}

/* ----- Create / edit modal ----- */
function AdEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: Ad | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { lang } = useLang();
  const t = DASHBOARD_COPY[lang];

  const [form, setForm] = useState<NewAd>(() => ({
    title:           initial?.title ?? '',
    sponsor_name:    initial?.sponsor_name ?? null,
    body:            initial?.body ?? null,
    image_url:       initial?.image_url ?? null,
    cta_label:       initial?.cta_label ?? null,
    cta_href:        initial?.cta_href ?? null,
    placement:       initial?.placement ?? 'category-card',
    target_category: initial?.target_category ?? null,
    target_slug:     initial?.target_slug ?? null,
    tier:            initial?.tier ?? 'sponsor',
    priority:        initial?.priority ?? 50,
    is_active:       initial?.is_active ?? true,
    starts_at:       initial?.starts_at ?? null,
    ends_at:         initial?.ends_at ?? null,
  }));

  const [busy, setBusy]   = useState(false);
  const [err, setErr]     = useState<string | null>(null);

  const set = <K extends keyof NewAd>(key: K, val: NewAd[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!form.title.trim()) {
      setErr(lang === 'fi' ? 'Otsikko vaaditaan.' : 'Title is required.');
      return;
    }
    setBusy(true);
    try {
      if (initial) {
        const patch: AdUpdate = { ...form };
        await updateAd(initial.id, patch);
      } else {
        await createAd(form);
      }
      onSaved();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : String(e2));
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.common.close}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#080c14]/95 p-7 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.common.close}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">
          {initial ? t.ads.edit : t.ads.newAd}
        </h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label={t.ads.titleField + ' *'} full>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.ads.sponsorField}>
            <input
              type="text"
              value={form.sponsor_name ?? ''}
              onChange={(e) => set('sponsor_name', e.target.value || null)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.ads.tierLabel}>
            <select
              value={form.tier}
              onChange={(e) => set('tier', e.target.value as AdTier)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            >
              {TIERS.map((tk) => (
                <option key={tk} value={tk} className="bg-[#080c14]">
                  {t.ads.tier[tk]}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t.ads.bodyField} full>
            <textarea
              rows={3}
              value={form.body ?? ''}
              onChange={(e) => set('body', e.target.value || null)}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.ads.imageField}>
            <input
              type="text"
              value={form.image_url ?? ''}
              placeholder={t.ads.imagePlaceholder}
              onChange={(e) => set('image_url', e.target.value || null)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.ads.placementLabel}>
            <select
              value={form.placement}
              onChange={(e) => set('placement', e.target.value as AdPlacement)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            >
              {PLACEMENTS.map((p) => (
                <option key={p} value={p} className="bg-[#080c14]">
                  {t.ads.placement[p]}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t.ads.ctaLabelField}>
            <input
              type="text"
              value={form.cta_label ?? ''}
              onChange={(e) => set('cta_label', e.target.value || null)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.ads.ctaHrefField}>
            <input
              type="text"
              value={form.cta_href ?? ''}
              placeholder={t.ads.ctaPlaceholder}
              onChange={(e) => set('cta_href', e.target.value || null)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          {form.placement === 'category-card' && (
            <Field label={t.ads.categoryField}>
              <select
                value={form.target_category ?? ''}
                onChange={(e) => set('target_category', e.target.value || null)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
              >
                <option value="" className="bg-[#080c14]">
                  {t.ads.categoryAny}
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#080c14]">
                    {c.navLabel[lang]}
                  </option>
                ))}
              </select>
            </Field>
          )}

          {form.placement === 'event-takeover' && (
            <Field label={t.ads.slugField}>
              <input
                type="text"
                value={form.target_slug ?? ''}
                placeholder="suomipop, secto-rally, olutsatama, viilu, …"
                onChange={(e) => set('target_slug', e.target.value || null)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
              />
            </Field>
          )}

          <Field label={t.ads.priorityField}>
            <input
              type="number"
              value={form.priority}
              min={0}
              max={1000}
              onChange={(e) => set('priority', Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.ads.startsAtField}>
            <input
              type="datetime-local"
              value={toLocalDT(form.starts_at)}
              onChange={(e) => set('starts_at', fromLocalDT(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <Field label={t.ads.endsAtField}>
            <input
              type="datetime-local"
              value={toLocalDT(form.ends_at)}
              onChange={(e) => set('ends_at', fromLocalDT(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </Field>

          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => set('is_active', e.target.checked)}
              className="h-4 w-4 accent-cyan-400"
            />
            <span className="text-sm font-light text-white/85">{t.ads.activeField}</span>
          </label>
        </div>

        {err && (
          <p className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs text-rose-200">
            {err}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/85"
          >
            {t.common.cancel}
          </button>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black disabled:cursor-progress disabled:opacity-70"
          >
            {busy ? t.common.saving : t.ads.save}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

/* ---------- helpers ---------- */
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

function toLocalDT(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const off = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - off).toISOString().slice(0, 16);
}
function fromLocalDT(local: string): string | null {
  if (!local) return null;
  return new Date(local).toISOString();
}
function fmtDateTime(iso: string, lang: 'fi' | 'en'): string {
  return new Date(iso).toLocaleString(lang === 'fi' ? 'fi-FI' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
