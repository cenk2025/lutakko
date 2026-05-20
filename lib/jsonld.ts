/**
 * Schema.org JSON-LD builders.
 *
 * Every builder returns a plain object that is safe to JSON.stringify and
 * embed into a <script type="application/ld+json"> tag. The shape follows
 * schema.org conventions (https://schema.org) and is tuned for what Google,
 * Bing, and modern AI crawlers (ChatGPT, Claude, Perplexity, Gemini) expect.
 */

import type { VenueEntry } from '@/data/venues';

export const SITE_URL = 'https://lutakko.info';

const ORG_ID  = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/* ----------------------------- Organization ----------------------------- */

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Voon IQ',
    legalName: 'Voon IQ',
    url: 'https://voon.fi',
    email: 'info@voon.fi',
    logo: `${SITE_URL}/favicon.svg`,
    description:
      'Voon IQ is a Finnish destination-marketing studio behind Lutakko.info, the official visitor and partner platform for Lutakon Satama in Jyväskylä.',
    foundingLocation: 'Jyväskylä, Finland',
    areaServed: 'Finland',
    sameAs: ['https://lutakko.info', 'https://voon.fi'],
  };
}

/* ------------------------------- Website ------------------------------- */

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: 'Lutakko.info',
    alternateName: 'Lutakon Satama',
    url: SITE_URL,
    description:
      'Lutakko.info is the official visitor and partner site for Lutakon Satama — Päijänne’s northernmost passenger harbour at the heart of Jyväskylä, Finland. Bilingual (FI/EN).',
    inLanguage: ['fi', 'en'],
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/* ----------------------------- Breadcrumbs ----------------------------- */

export function breadcrumbLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

/* --------------------------- LocalBusiness ----------------------------- */

interface PlaceLike {
  address?: string | null;
  url?: string | null;
  phone?: string | null;
  email?: string | null;
  image?: string | null;
}

function placeAddress(addr: string | null | undefined) {
  if (!addr) return undefined;
  // Heuristic: handle the "Street 8, 40100 Jyväskylä" pattern.
  const m = addr.match(/^([^,]+),\s*(\d{5})\s+([^,]+)/);
  return {
    '@type': 'PostalAddress',
    streetAddress: m ? m[1].trim() : addr,
    postalCode: m ? m[2] : undefined,
    addressLocality: m ? m[3].trim() : 'Jyväskylä',
    addressCountry: 'FI',
  };
}

export function localBusinessLd(
  venue: VenueEntry,
  lang: 'fi' | 'en' = 'fi',
  type:
    | 'LocalBusiness'
    | 'Restaurant'
    | 'BarOrPub'
    | 'CafeOrCoffeeShop'
    | 'HealthAndBeautyBusiness'
    | 'NightClub'
    | 'TouristAttraction' = 'LocalBusiness',
) {
  const t = venue[lang];
  const id = `${SITE_URL}/venues/${venue.slug}/#${type.toLowerCase()}`;
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': id,
    name: t.hero.title,
    description: t.about,
    url: venue.url ?? `${SITE_URL}/venues/${venue.slug}/`,
    image: venue.image ? `${SITE_URL}${venue.image}` : undefined,
    address: placeAddress(venue.address),
    telephone: venue.phone ?? undefined,
    email: venue.email ?? undefined,
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    sameAs: venue.url ? [venue.url] : undefined,
  };
}

/* ------------------------------- Event -------------------------------- */

interface EventDates {
  startISO?: string;
  endISO?: string;
}

export function eventLd(venue: VenueEntry, lang: 'fi' | 'en', dates: EventDates = {}) {
  const t = venue[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${SITE_URL}/venues/${venue.slug}/#event`,
    name: t.hero.title,
    description: t.about,
    url: venue.url ?? `${SITE_URL}/venues/${venue.slug}/`,
    image: venue.image ? `${SITE_URL}${venue.image}` : undefined,
    startDate: dates.startISO,
    endDate: dates.endISO,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Lutakon Satama, Jyväskylä',
      address: placeAddress(venue.address ?? 'Lutakko, Jyväskylä'),
    },
    organizer: { '@id': ORG_ID },
    isAccessibleForFree: false,
  };
}

/** Known event windows (kept here so the SEO layer doesn't depend on the
 *  bullet copy in data/content.ts). All times in Europe/Helsinki, ISO-8601. */
export const EVENT_DATES: Record<string, EventDates> = {
  olutsatama:          { startISO: '2026-06-11T17:00+03:00', endISO: '2026-06-13T02:00+03:00' },
  suomipop:            { startISO: '2026-07-09T15:00+03:00', endISO: '2026-07-11T23:59+03:00' },
  'secto-rally':       { startISO: '2026-07-30T08:00+03:00', endISO: '2026-08-02T20:00+03:00' },
  'finlandia-marathon':{ }, // TBD — left intentionally empty
};

/* ----------------------------- VenueAuto ------------------------------ */

const VENUE_TYPE_MAP: Record<string, Parameters<typeof localBusinessLd>[2]> = {
  viilu:              'Restaurant',
  gaia:               'Restaurant',
  'musta-magia':      'Restaurant',
  morton:             'Restaurant',
  'sataman-kahvila':  'CafeOrCoffeeShop',
  'trattoria-aukio':  'Restaurant',
  hiisi:              'BarOrPub',
  saunalautta:        'HealthAndBeautyBusiness',
  'tanssisali-lutakko': 'NightClub',
};

/** Pick the most specific schema.org type and emit the right JSON-LD for a
 *  venue or event, based on its `kind` and `slug`. */
export function venueLd(venue: VenueEntry, lang: 'fi' | 'en' = 'fi') {
  if (venue.kind === 'event') {
    return eventLd(venue, lang, EVENT_DATES[venue.slug] ?? {});
  }
  const type = VENUE_TYPE_MAP[venue.slug] ?? 'LocalBusiness';
  return localBusinessLd(venue, lang, type);
}
