import type { Lang } from './content';

export type BookingKind = 'activity' | 'sauna';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export type DashboardTab = 'overview' | 'activities' | 'sauna' | 'bookings' | 'profile' | 'ads';

type IconKey = 'sports' | 'marina' | 'picnic' | 'kids' | 'food' | 'sauna' | 'stage' | 'viilu' | 'rally';

interface LocalisedItemCopy {
  title: string;
  desc: string;
  cta: string;
}

export interface ActivityItem {
  id: string;
  icon: IconKey;
  /** Available durations in minutes. */
  durationMins: number[];
  /** Suggested default index inside durationMins. */
  defaultDurationIdx: number;
  maxParty: number;
  /** Tailwind accent class for the card border / pill. */
  accent: 'cyan' | 'lime' | 'amber' | 'violet' | 'rose';
  fi: LocalisedItemCopy;
  en: LocalisedItemCopy;
}

export interface SaunaItem {
  id: string;
  icon: IconKey;
  durationMins: number;
  maxParty: number;
  accent: 'cyan' | 'lime' | 'amber' | 'violet' | 'rose';
  fi: LocalisedItemCopy;
  en: LocalisedItemCopy;
}

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'beach-volley',
    icon: 'sports',
    durationMins: [60, 90, 120],
    defaultDurationIdx: 1,
    maxParty: 8,
    accent: 'lime',
    fi: { title: 'Beach Volley -kenttä', desc: 'Rantakentän pelivuoro', cta: 'Varaa kenttä' },
    en: { title: 'Beach volleyball court', desc: 'Shoreline court booking', cta: 'Book the court' },
  },
  {
    id: 'outdoor-gym',
    icon: 'sports',
    durationMins: [30, 45, 60],
    defaultDurationIdx: 1,
    maxParty: 5,
    accent: 'cyan',
    fi: { title: 'Ulkokuntosali', desc: 'Yksityisvuoro ohjaajan kanssa', cta: 'Varaa vuoro' },
    en: { title: 'Outdoor gym', desc: 'Private session with a coach', cta: 'Book a session' },
  },
  {
    id: 'marina-berth',
    icon: 'marina',
    durationMins: [720, 1440, 2880], // 12h, 24h, 48h
    defaultDurationIdx: 1,
    maxParty: 12,
    accent: 'cyan',
    fi: { title: 'Vierasvenepaikka', desc: 'Yöpaikka sähköllä ja vedellä', cta: 'Varaa venepaikka' },
    en: { title: 'Guest marina berth', desc: 'Overnight slot w/ shore power & water', cta: 'Reserve a berth' },
  },
  {
    id: 'kayak-rental',
    icon: 'marina',
    durationMins: [60, 120, 240],
    defaultDurationIdx: 1,
    maxParty: 4,
    accent: 'amber',
    fi: { title: 'Kajakkivuokra', desc: 'Päijänteen rantamaisemiin', cta: 'Vuokraa kajakki' },
    en: { title: 'Kayak rental', desc: 'Out into Lake Päijänne', cta: 'Rent a kayak' },
  },
  {
    id: 'picnic-spot',
    icon: 'picnic',
    durationMins: [60, 120, 180],
    defaultDurationIdx: 1,
    maxParty: 12,
    accent: 'rose',
    fi: { title: 'Piknik-paikka', desc: 'Katettu piknikpöytä järven äärellä', cta: 'Varaa paikka' },
    en: { title: 'Picnic spot', desc: 'Covered picnic table by the water', cta: 'Reserve a spot' },
  },
];

export const SAUNAS: SaunaItem[] = [
  {
    id: 'sauna-viilu-private',
    icon: 'sauna',
    durationMins: 120,
    maxParty: 12,
    accent: 'amber',
    fi: { title: 'Saunaravintola Sataman Viilu — privaatti', desc: 'Yksityinen löyly + à la carte illallinen · satamanviilu.fi', cta: 'Varaa privaatti' },
    en: { title: 'Sauna restaurant Sataman Viilu — private', desc: 'Private löyly + à la carte dinner · satamanviilu.fi', cta: 'Book private' },
  },
  {
    id: 'sauna-viilu-public',
    icon: 'sauna',
    durationMins: 90,
    maxParty: 4,
    accent: 'cyan',
    fi: { title: 'Sataman Viilu — julkinen vuoro', desc: 'Avoin saunavuoro veden äärellä · satamanviilu.fi', cta: 'Varaa vuoro' },
    en: { title: 'Sataman Viilu — public slot', desc: 'Open sauna slot by the lake · satamanviilu.fi', cta: 'Book a slot' },
  },
  {
    id: 'sauna-lakefront',
    icon: 'sauna',
    durationMins: 90,
    maxParty: 6,
    accent: 'lime',
    fi: { title: 'Rantasauna', desc: 'Julkinen saunaranta, palju + avanto', cta: 'Varaa vuoro' },
    en: { title: 'Public lakefront sauna', desc: 'Outdoor sauna + hot tub + ice swim', cta: 'Book a slot' },
  },
];

export const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'];

export const PARTY_SIZE_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10, 12];

export function getActivity(id: string): ActivityItem | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}
export function getSauna(id: string): SaunaItem | undefined {
  return SAUNAS.find((s) => s.id === id);
}

/** Resolve a localised title for a stored booking row. Falls back to the key. */
export function resolveItemLabel(kind: BookingKind, key: string, lang: Lang): string {
  if (kind === 'activity') return getActivity(key)?.[lang].title ?? key;
  return getSauna(key)?.[lang].title ?? key;
}

export function formatDuration(mins: number, lang: Lang): string {
  if (mins >= 1440) {
    const days = Math.round(mins / 1440);
    return lang === 'fi' ? `${days} pv` : `${days} d`;
  }
  if (mins >= 60) {
    const h = mins / 60;
    return lang === 'fi'
      ? `${Number.isInteger(h) ? h : h.toFixed(1)} t`
      : `${Number.isInteger(h) ? h : h.toFixed(1)} h`;
  }
  return lang === 'fi' ? `${mins} min` : `${mins} min`;
}

export const DASHBOARD_COPY = {
  fi: {
    title: 'Hallintapaneeli',
    sub: 'Aktiviteetit, saunat ja varaukseni',
    tabs: {
      overview: 'Yleiskuva',
      activities: 'Aktiviteetit',
      sauna: 'Sauna',
      bookings: 'Varaukseni',
      profile: 'Profiili',
      ads: 'Mainokset',
    },
    common: {
      backToSite: 'Takaisin etusivulle',
      signOut: 'Kirjaudu ulos',
      date: 'Päivämäärä',
      time: 'Kellonaika',
      duration: 'Kesto',
      partySize: 'Henkilöitä',
      notes: 'Lisätiedot (vapaaehtoinen)',
      notesPlaceholder: 'Esim. erityistoiveet, allergiat…',
      confirm: 'Vahvista varaus',
      saving: 'Tallennetaan…',
      cancelling: 'Peruutetaan…',
      cancel: 'Peruuta',
      cancelled: 'Peruutettu',
      confirmed: 'Vahvistettu',
      pending: 'Odottaa',
      loading: 'Ladataan…',
      retry: 'Yritä uudelleen',
      close: 'Sulje',
      saved: 'Tallennettu',
      error: 'Tapahtui virhe.',
      successBooking: 'Varaus tallennettu — näet sen "Varaukseni"-välilehdellä.',
      notConfigured:
        'Yhteyttä Supabase-tietokantaan ei ole vielä määritetty. Lisää NEXT_PUBLIC_SUPABASE_URL ja NEXT_PUBLIC_SUPABASE_ANON_KEY Vercel-ympäristöön, niin paneeli aktivoituu.',
    },
    guard: {
      title: 'Kirjautuminen vaaditaan',
      sub: 'Hallintapaneelin pääsy edellyttää kirjautumista.',
      open: 'Avaa kirjautuminen',
    },
    overview: {
      hello: 'Hei',
      welcome: 'Tervetuloa takaisin Lutakon Satamaan.',
      upcoming: 'Tulevat varaukset',
      none: 'Sinulla ei ole vielä tulevia varauksia.',
      quickActions: 'Pikatoiminnot',
      browseActivities: 'Selaa aktiviteetteja',
      bookSauna: 'Varaa saunavuoro',
      seeAll: 'Näytä kaikki',
      stats: {
        upcoming: 'Tulevat',
        completed: 'Mennyt',
        sauna: 'Saunavarauksia',
        total: 'Yhteensä',
      },
    },
    activities: {
      title: 'Aktiviteetit',
      sub: 'Valitse aktiviteetti — täytä varauslomake ja vahvista.',
    },
    sauna: {
      title: 'Sauna',
      sub: 'Yksityiset ja yhteiset löylyt rannan tuntumassa.',
    },
    bookings: {
      title: 'Varaukseni',
      empty: 'Ei vielä varauksia. Aloita aktiviteetti- tai saunavälilehdeltä.',
      filterAll: 'Kaikki',
      filterActivity: 'Aktiviteetit',
      filterSauna: 'Saunat',
      filterUpcoming: 'Tulevat',
      filterPast: 'Menneet',
      filterCancelled: 'Peruutetut',
      cancelConfirm: 'Haluatko varmasti peruuttaa tämän varauksen?',
    },
    profile: {
      title: 'Profiili',
      sub: 'Päivitä yhteystietosi ja kieliasetukset.',
      fullName: 'Koko nimi',
      phone: 'Puhelin',
      preferredLang: 'Käyttöliittymän kieli',
      save: 'Tallenna muutokset',
      memberSince: 'Jäsen alkaen',
    },
    ads: {
      title: 'Mainosten hallinta',
      sub: 'Lisää, ajasta ja arkistoi sponsori- ja mainoskampanjat. Ajan päättyessä mainos poistuu sivustolta automaattisesti.',
      newAd: 'Uusi mainos',
      noAds: 'Ei vielä yhtään mainosta. Aloita "Uusi mainos" -painikkeesta.',
      filters: { all: 'Kaikki', live: 'Näkyvissä', scheduled: 'Ajastettu', expired: 'Päättynyt', paused: 'Pysäytetty' },
      status: { live: 'Näkyvissä', scheduled: 'Ajastettu', expired: 'Päättynyt', paused: 'Pysäytetty' },
      placementLabel: 'Sijoittelu',
      placement: {
        'hero-banner': 'Hero-banneri (etusivu)',
        'category-card': 'Kategoria-kortti',
        'footer-banner': 'Footer-banneri',
        'event-takeover': 'Tapahtumasivun valtaus',
        newsletter: 'Uutiskirjeen paikka',
      },
      tierLabel: 'Taso',
      tier: { free: 'Ilmainen', starter: 'Starter', pro: 'Pro', premium: 'Premium', sponsor: 'Sponsori' },
      titleField: 'Otsikko',
      sponsorField: 'Sponsorin nimi',
      bodyField: 'Tekstisisältö',
      imageField: 'Kuva-URL',
      imagePlaceholder: '/images/ads/... tai https://...',
      ctaLabelField: 'CTA-painikkeen teksti',
      ctaHrefField: 'CTA-painikkeen linkki',
      ctaPlaceholder: 'mailto:... tai https://...',
      categoryField: 'Kategoria (valinnainen)',
      categoryAny: 'Kaikki kategoriat',
      slugField: 'Sivu-slug (event-takeover)',
      priorityField: 'Prioriteetti',
      startsAtField: 'Alkaa',
      endsAtField: 'Päättyy',
      activeField: 'Aktiivinen',
      save: 'Tallenna',
      edit: 'Muokkaa',
      delete: 'Poista',
      deleteConfirm: 'Poistetaanko tämä mainos pysyvästi?',
      preview: 'Esikatselu',
      requiredOnlyAdmin: 'Vain pääkäyttäjillä on pääsy mainosten hallintaan.',
      adminBadge: 'Pääkäyttäjä',
    },
  },
  en: {
    title: 'Dashboard',
    sub: 'Activities, saunas and your bookings',
    tabs: {
      overview: 'Overview',
      activities: 'Activities',
      sauna: 'Sauna',
      bookings: 'My bookings',
      profile: 'Profile',
      ads: 'Ads',
    },
    common: {
      backToSite: 'Back to site',
      signOut: 'Sign out',
      date: 'Date',
      time: 'Time',
      duration: 'Duration',
      partySize: 'Party size',
      notes: 'Notes (optional)',
      notesPlaceholder: 'E.g. special requests, allergies…',
      confirm: 'Confirm booking',
      saving: 'Saving…',
      cancelling: 'Cancelling…',
      cancel: 'Cancel',
      cancelled: 'Cancelled',
      confirmed: 'Confirmed',
      pending: 'Pending',
      loading: 'Loading…',
      retry: 'Retry',
      close: 'Close',
      saved: 'Saved',
      error: 'Something went wrong.',
      successBooking: 'Booking saved — find it under "My bookings".',
      notConfigured:
        'Supabase connection is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel and the dashboard activates.',
    },
    guard: {
      title: 'Sign-in required',
      sub: 'You need to sign in to access the dashboard.',
      open: 'Open sign-in',
    },
    overview: {
      hello: 'Hi',
      welcome: 'Welcome back to Lutakon Satama.',
      upcoming: 'Upcoming bookings',
      none: 'No upcoming bookings yet.',
      quickActions: 'Quick actions',
      browseActivities: 'Browse activities',
      bookSauna: 'Book a sauna slot',
      seeAll: 'See all',
      stats: {
        upcoming: 'Upcoming',
        completed: 'Completed',
        sauna: 'Sauna bookings',
        total: 'Total',
      },
    },
    activities: {
      title: 'Activities',
      sub: 'Pick an activity — fill in the form and confirm.',
    },
    sauna: {
      title: 'Sauna',
      sub: 'Private and shared löyly sessions by the lake.',
    },
    bookings: {
      title: 'My bookings',
      empty: 'No bookings yet. Start from the Activities or Sauna tab.',
      filterAll: 'All',
      filterActivity: 'Activities',
      filterSauna: 'Sauna',
      filterUpcoming: 'Upcoming',
      filterPast: 'Past',
      filterCancelled: 'Cancelled',
      cancelConfirm: 'Are you sure you want to cancel this booking?',
    },
    profile: {
      title: 'Profile',
      sub: 'Update your contact details and language preferences.',
      fullName: 'Full name',
      phone: 'Phone',
      preferredLang: 'Interface language',
      save: 'Save changes',
      memberSince: 'Member since',
    },
    ads: {
      title: 'Ad management',
      sub: 'Add, schedule and archive sponsor and ad campaigns. Once the end date passes, the ad is automatically hidden from the site.',
      newAd: 'New ad',
      noAds: 'No ads yet. Start with "New ad" to create one.',
      filters: { all: 'All', live: 'Live', scheduled: 'Scheduled', expired: 'Expired', paused: 'Paused' },
      status: { live: 'Live', scheduled: 'Scheduled', expired: 'Expired', paused: 'Paused' },
      placementLabel: 'Placement',
      placement: {
        'hero-banner': 'Hero banner (homepage)',
        'category-card': 'Category card',
        'footer-banner': 'Footer banner',
        'event-takeover': 'Event-page takeover',
        newsletter: 'Newsletter slot',
      },
      tierLabel: 'Tier',
      tier: { free: 'Free', starter: 'Starter', pro: 'Pro', premium: 'Premium', sponsor: 'Sponsor' },
      titleField: 'Title',
      sponsorField: 'Sponsor name',
      bodyField: 'Body copy',
      imageField: 'Image URL',
      imagePlaceholder: '/images/ads/... or https://...',
      ctaLabelField: 'CTA button text',
      ctaHrefField: 'CTA button link',
      ctaPlaceholder: 'mailto:... or https://...',
      categoryField: 'Category (optional)',
      categoryAny: 'All categories',
      slugField: 'Page slug (event-takeover)',
      priorityField: 'Priority',
      startsAtField: 'Starts',
      endsAtField: 'Ends',
      activeField: 'Active',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      deleteConfirm: 'Delete this ad permanently?',
      preview: 'Preview',
      requiredOnlyAdmin: 'Ad management is restricted to admins.',
      adminBadge: 'Admin',
    },
  },
} as const;
