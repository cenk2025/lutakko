export type Lang = 'fi' | 'en';

export interface ContentSection {
  title: string;
  subtitle: string;
}

export interface ContentDetails {
  title: string;
  desc: string;
  bulletPoints: string[];
}

export interface FeatureCardCopy {
  icon: 'picnic' | 'kids' | 'sports' | 'viilu' | 'marina' | 'stage' | 'food' | 'sauna' | 'rally';
  title: string;
  description: string;
}

export interface ContentTranslation {
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  section1: ContentSection;
  section2: ContentSection;
  section3: ContentSection;
  details: ContentDetails;
  features: FeatureCardCopy[];
  cta: { label: string; href: string };
}

export interface CategoryAssets {
  /** Big spotlight image at the top of the section. */
  hero: { src: string; alt: { fi: string; en: string } };
  /** 3 supporting gallery shots beneath the spotlight. */
  gallery: Array<{ src: string; alt: { fi: string; en: string } }>;
}

export interface Category {
  id: string;
  navLabel: { fi: string; en: string };
  themeColor: string;
  themeRgb: [number, number, number];
  themeRgbSecondary: [number, number, number];
  gradient: string;
  assets: CategoryAssets;
  fi: ContentTranslation;
  en: ContentTranslation;
}

/* -------------------------------------------------------------------------- */
/*  HERO SCROLLYTELLING SEQUENCE                                              */
/* -------------------------------------------------------------------------- */

export interface ScrollSequenceConfig {
  folderPath: string;       // /images/scrollable/<folderPath>/
  frameCount: number;
  framePrefix: string;
  frameExt: 'webp' | 'jpg' | 'png';
  frameStart: number;
}

export const HERO_SEQUENCE: ScrollSequenceConfig = {
  folderPath: 'hero',
  frameCount: 96,
  framePrefix: 'ezgif-frame-',
  frameExt: 'jpg',
  frameStart: 145,
};

export const HERO_TEXT = {
  fi: {
    eyebrow: 'Jyväskylä · Lutakko',
    beat1: {
      title: 'Lutakon Satama',
      sub: 'Suomen sykkivin järvenrantakortteli — festivaaleja, ravintoloita, satamaa ja saunaa.',
    },
    beat2: {
      title: 'Lutakon Ruoka & Sauna',
      sub:
        'Saunaravintola Sataman Viilu, ravintolalaivat Gaia ja Musta Magia, Konttiravintolat Morton ja Waves, HIISI-panimon taproom ja iglu-saunalaiva — pohjoismainen makumatka veden äärellä.',
    },
    beat3: {
      title: 'Lutakon Kulttuuri & Liikunta',
      sub:
        'Tanssisali Lutakon legendaariset keikat, Finlandia Marathon, Reserved Gym, beach volley, Gr8 Wake -vesiurheilukeskus ja 13 km Jyväskylän Rantaraitti — konsertit, kuntosalit ja kilometrit veden äärellä.',
    },
    beat4: {
      title: 'Lutakon Business',
      sub:
        'Innova 1, 2 ja 4 — Kielo Toimitilojen kestävät toimistorakennukset tapahtumakorttelin sydämessä. Joustavat sopimukset, 100 % vihreä energia, sauna ja kokoustilat.',
    },
    floor: 'Vieritä alas — neljä lukua odottavat',
  },
  en: {
    eyebrow: 'Jyväskylä · Lutakko',
    beat1: {
      title: 'Lutakon Satama',
      sub: 'Finland’s most alive lakeshore quarter — festivals, restaurants, marina and sauna.',
    },
    beat2: {
      title: 'Lutakko Dine & Sauna',
      sub:
        'Sauna restaurant Sataman Viilu, restaurant ships Gaia and Musta Magia, container kitchens Morton and Waves, the HIISI Brewery taproom and the world’s first igloo-sauna boat — a Nordic flavour journey by the water.',
    },
    beat3: {
      title: 'Lutakko Culture & Sports',
      sub:
        'Legendary gigs at Tanssisali Lutakko, the Finlandia Marathon, Reserved Gym, beach volleyball, the Gr8 Wake water-sports centre and the 13 km Rantaraitti trail — concerts, gyms and kilometres by the water.',
    },
    beat4: {
      title: 'Lutakko Business',
      sub:
        'Innova 1, 2 and 4 — Kielo Toimitilat’s sustainable office buildings at the heart of the event district. Flexible terms, 100% green energy, sauna and meeting rooms.',
    },
    floor: 'Scroll down — four chapters await',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  SITE-WIDE COPY                                                            */
/* -------------------------------------------------------------------------- */

export const SITE_META = {
  fi: {
    name: 'Lutakko.info',
    subtitle: 'Lutakon Satama',
    tagline: 'Suomen elämyksellisin satama',
    description:
      'Päijänteen pohjoisin matkustajasatama Jyväskylän sydämessä — festivaaleja, ravintolalaivoja, saunaa, vesiurheilua ja perheaktiviteetteja Lutakonaukion ja rantaraitin tuntumassa.',
  },
  en: {
    name: 'Lutakko.info',
    subtitle: 'Lutakon Satama',
    tagline: 'Finland’s most experiential harbour',
    description:
      'Päijänne’s northernmost passenger harbour at the heart of Jyväskylä — festivals, restaurant ships, sauna, water sports and family activities along Lutakonaukio square and the lakeside promenade.',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  FEATURE CARD → /venues/<slug>/ registry                                   */
/* -------------------------------------------------------------------------- */
/* Maps a FeatureCardCopy.title (FI or EN) to the matching venue-page slug.
   When a feature card's title is present here, FeatureGrid wraps the entire
   card in a <Link> so the homepage "Lue lisää / Learn more" callout actually
   navigates to /venues/<slug>/.                                              */

export const FEATURE_VENUE_SLUGS: Record<string, string> = {
  // Events
  'Kansainväliset Suurmarkkinat':   'kansainvaliset-suurmarkkinat',
  'International Grand Markets':    'kansainvaliset-suurmarkkinat',
  'OlutSatama':                     'olutsatama',
  'SuomiPop Festival':              'suomipop',
  'Secto Rally Finland':            'secto-rally',

  // Food & Sauna
  'Saunaravintola Sataman Viilu':   'viilu',
  'Sauna restaurant Sataman Viilu': 'viilu',
  'Ravintolalaiva Gaia':            'gaia',
  'Restaurant ship Gaia':           'gaia',
  'M/S Musta Magia':                'musta-magia',
  'Konttiravintola Morton':         'morton',
  'Jyväskylän Sataman Kahvila':     'sataman-kahvila',
  'Jyväskylä Harbour Café':         'sataman-kahvila',
  'Konttiravintola Waves':          'waves',
  'HIISI Taproom & Bottleshop':     'hiisi',

  // Culture & Sports
  'Tanssisali Lutakko':             'tanssisali-lutakko',
  'Reserved Gym':                   'reserved-gym',
  'Reserved Gym (Innova 4)':        'reserved-gym',
  'Finlandia Marathon':             'finlandia-marathon',

  // Business
  'Jyväskylän Paviljonki':          'paviljonki',
  'Innova 1 (Piippukatu 11)':       'innova-1',
  'Innova 2 (Lutakonaukio 7)':      'innova-2',
  'Innova 4 (Lutakonaukio 1)':      'innova-4',
};

export const NAV_LINKS: Array<{ key: string; fi: string; en: string }> = [
  { key: 'festivals-culture', fi: 'Tapahtumat',          en: 'Events' },
  { key: 'food-sauna',        fi: 'Ruoka & Sauna',       en: 'Dine & Sauna' },
  { key: 'marina-recreation', fi: 'Kulttuuri & liikunta', en: 'Culture & sports' },
  { key: 'business',          fi: 'Business',            en: 'Business' },
];

/* -------------------------------------------------------------------------- */
/*  Top-nav dropdown menu — 3 groups with per-venue links                     */
/* -------------------------------------------------------------------------- */

export interface NavMenuItem {
  slug: string;
  fi: string;
  en: string;
}
export interface NavMenuGroup {
  key: string;
  fi: string;
  en: string;
  items: NavMenuItem[];
}

export const NAV_MENU: NavMenuGroup[] = [
  {
    key: 'events',
    fi: 'Tapahtumat',
    en: 'Events',
    items: [
      { slug: 'kansainvaliset-suurmarkkinat', fi: 'Kansainväliset Suurmarkkinat', en: 'International Grand Markets' },
      { slug: 'olutsatama',                   fi: 'OlutSatama',                   en: 'OlutSatama' },
      { slug: 'suomipop',                     fi: 'SuomiPop',                     en: 'SuomiPop' },
      { slug: 'secto-rally',                  fi: 'Ralli',                        en: 'Rally' },
    ],
  },
  {
    key: 'food-sauna',
    fi: 'Ruoka & Sauna',
    en: 'Dine & Sauna',
    items: [
      { slug: 'viilu',           fi: 'Viilu',           en: 'Viilu' },
      { slug: 'saunalautta',     fi: 'Saunalautat',     en: 'Sauna rafts' },
      { slug: 'morton',          fi: 'Morton',          en: 'Morton' },
      { slug: 'waves',           fi: 'Waves',           en: 'Waves' },
      { slug: 'trattoria-aukio', fi: 'Trattoria Aukio', en: 'Trattoria Aukio' },
      { slug: 'musta-magia',     fi: 'M/S Musta Magia', en: 'M/S Musta Magia' },
      { slug: 'hiisi',           fi: 'HIISI',           en: 'HIISI' },
      { slug: 'gaia',            fi: 'Gaia',            en: 'Gaia' },
    ],
  },
  {
    key: 'culture-sports',
    fi: 'Kulttuuri & liikunta',
    en: 'Culture & sports',
    items: [
      { slug: 'tanssisali-lutakko', fi: 'Tanssisali Lutakko', en: 'Tanssisali Lutakko' },
      { slug: 'reserved-gym',       fi: 'Reserved Gym',       en: 'Reserved Gym' },
      { slug: 'finlandia-marathon', fi: 'Finlandia Marathon', en: 'Finlandia Marathon' },
    ],
  },
  {
    key: 'business',
    fi: 'Business',
    en: 'Business',
    items: [
      { slug: 'paviljonki', fi: 'Jyväskylän Paviljonki',     en: 'Jyväskylän Paviljonki' },
      { slug: 'innova-1',   fi: 'Innova 1 (Piippukatu 11)',  en: 'Innova 1 (Piippukatu 11)' },
      { slug: 'innova-2',   fi: 'Innova 2 (Lutakonaukio 7)', en: 'Innova 2 (Lutakonaukio 7)' },
      { slug: 'innova-4',   fi: 'Innova 4 (Lutakonaukio 1)', en: 'Innova 4 (Lutakonaukio 1)' },
    ],
  },
];

/** Resolve which NAV_MENU group a given /venues/<slug> page belongs to. */
export function navGroupForSlug(slug: string | null | undefined): NavMenuGroup | null {
  if (!slug) return null;
  return NAV_MENU.find((g) => g.items.some((i) => i.slug === slug)) ?? null;
}

/* -------------------------------------------------------------------------- */
/*  THE THREE CONTENT CATEGORIES                                              */
/* -------------------------------------------------------------------------- */

export const CATEGORIES: Category[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Festivals & Culture                                              */
  /* ------------------------------------------------------------------ */
  {
    id: 'festivals-culture',
    navLabel: { fi: 'Tapahtumat', en: 'Events' },
    themeColor: '#fb7185',
    themeRgb: [251, 113, 133],
    themeRgbSecondary: [251, 191, 36],
    gradient: 'linear-gradient(135deg, #fb7185 0%, #fbbf24 60%, #a78bfa 100%)',
    assets: {
      hero: {
        src: '/images/featured/festivals-culture/hero.jpg',
        alt: {
          fi: 'Lutakonaukio festivaali-iltana',
          en: 'Lutakonaukio square on a festival evening',
        },
      },
      gallery: [
        {
          src: '/images/featured/festivals-culture/gallery-1.jpg',
          alt: { fi: 'Lutakonaukio lavan edessä', en: 'Lutakonaukio crowd in front of the stage' },
        },
        {
          src: '/images/featured/festivals-culture/gallery-2.jpg',
          alt: { fi: 'Yöllinen aukio valoissa', en: 'The square lit up at night' },
        },
        {
          src: '/images/featured/festivals-culture/gallery-3.jpg',
          alt: { fi: 'Sataman valoshow', en: 'Harbour light show' },
        },
      ],
    },
    fi: {
      title: 'Lavat syttyvät',
      subtitle: 'Festivaalit, rallit ja Lutakonaukion sykintä',
      description:
        'SuomiPopin bassot kantautuvat veden yli, Secto Rally Finland täyttää korttelin moottoreiden hurinalla ja Lutakonaukio elää koko kesän — konsertit, kesäteatteri ja katukulttuuri kutsuvat pysähtymään.',
      tagline: 'Kesä, joka kuuluu kauas',
      section1: {
        title: 'SuomiPop kokoaa Suomen',
        subtitle:
          'Kolme päivää, kymmeniä artisteja, yksi rantanäkymä — Lutakko muuttuu Suomen suurimmaksi kesäsaliksi.',
      },
      section2: {
        title: 'Rallien sydämessä',
        subtitle:
          'Secto Rally Finland (30.7.–2.8.2026) tuo maailmanluokan moottoriurheilun ydinkeskustaan. Servicepark on kävelymatkan päässä satamasta.',
      },
      section3: {
        title: 'Lutakonaukio läpi vuoden',
        subtitle:
          'Aukio elää aamukahveista myöhäisiin DJ-iltoihin. Kausi vaihtuu, ohjelma ei lopu koskaan.',
      },
      details: {
        title: 'Kulttuurikevät ja -kesä Lutakossa',
        desc: 'Tanssisali Lutakko, Paviljonki ja avoimet aukiot — tapahtumakortteli rakennettiin musiikille ja yhteisille hetkille.',
        bulletPoints: [
          'Kansainväliset Suurmarkkinat 4.–7.6.2026 Lutakonaukiolla · yli 30 maan myyjät, kansainvälinen ruoka, käsityöt, lasten karnevaali · maksuton sisäänpääsy · eurooppamarkkinat.fi/jyvaskyla',
          'OlutSatama 11.–13.6.2026 Lutakonaukiolla · "Suomen paras olut-tapahtuma", 200+ panimoa · olutsatama.fi',
          'SuomiPop Festival 9.–11.7.2026 Jyväskylässä · liput suomipopfestivaali.fi/jyvaskyla/liput',
          'Secto Rally Finland 30.7.–2.8.2026 Jyväskylässä · Servicepark Paviljongilla · sectorallyfinland.fi',
          'Finlandia Marathon · Jyväskylän marathon-klassikko (osallistujat täyttävät Lutakon palvelut tapahtumaviikonloppuna) · finlandiamarathon.fi',
          'Talvitapahtumat: jääbaari ja valoinstallaatiot rantapromenadilla',
        ],
      },
      features: [
        {
          icon: 'food',
          title: 'Kansainväliset Suurmarkkinat',
          description: 'Yli 30 maan myyjät Lutakonaukiolle 4.–7.6.2026 — käsityöt, kansainvälinen ruoka, lasten karnevaali. Maksuton sisäänpääsy. eurooppamarkkinat.fi/jyvaskyla',
        },
        {
          icon: 'food',
          title: 'OlutSatama',
          description: '"Suomen paras olut-tapahtuma" 11.–13.6.2026 Lutakonaukiolla — yli 200 panimoa, ruokapisteitä ja keikkoja. 49 000+ kävijää vuodesta 2016. olutsatama.fi',
        },
        {
          icon: 'stage',
          title: 'SuomiPop Festival',
          description: 'SuomiPop kerää 9.–11.7.2026 kymmeniä artisteja ja kymmenettuhannet kävijät — päälava rannalla, Pohjoismaiden komein järvinäkymä. suomipopfestivaali.fi/jyvaskyla',
        },
        {
          icon: 'rally',
          title: 'Secto Rally Finland',
          description: 'WRC-osakilpailu 30.7.–2.8.2026, Servicepark Paviljongilla — pääset lähelle koneita, joiden ääni täyttää koko kaupungin. sectorallyfinland.fi',
        },
      ],
      cta: { label: 'Tapahtumakalenteri', href: '/dashboard/#calendar' },
    },
    en: {
      title: 'The stages light up',
      subtitle: 'Festivals, rallies and the rhythm of Lutakonaukio square',
      description:
        'SuomiPop’s bass rolls across the lake, Secto Rally Finland fills the block with engine roar, and Lutakonaukio square breathes culture all summer long — concerts, theatre and street life invite you to stop.',
      tagline: 'A summer that travels far',
      section1: {
        title: 'SuomiPop gathers Finland',
        subtitle:
          'Three days, dozens of artists, one lakefront view — Lutakko becomes Finland’s largest open-air living room.',
      },
      section2: {
        title: 'At the heart of the rally',
        subtitle:
          'Secto Rally Finland (30 Jul – 2 Aug 2026) brings world-class motorsport into the city centre. The service park is a short walk from the marina.',
      },
      section3: {
        title: 'Lutakonaukio year round',
        subtitle:
          'From early morning coffees to late-night DJ sets, the square never really sleeps — the programme just changes seasons.',
      },
      details: {
        title: 'Spring & summer culture in Lutakko',
        desc: 'Tanssisali Lutakko, Paviljonki and open squares — this district was built for music and gatherings.',
        bulletPoints: [
          'International Grand Markets — 4–7 Jun 2026 on Lutakonaukio · vendors from 30+ countries, international food, crafts, children’s carnival · free entry · eurooppamarkkinat.fi/jyvaskyla',
          'OlutSatama — 11–13 Jun 2026 on Lutakonaukio · "Finland’s best beer event", 200+ breweries · olutsatama.fi',
          'SuomiPop Festival — 9–11 Jul 2026 in Jyväskylä · tickets at suomipopfestivaali.fi/jyvaskyla/liput',
          'Secto Rally Finland — 30 Jul – 2 Aug 2026 in Jyväskylä · Service Park at Paviljonki · sectorallyfinland.fi',
          'Finlandia Marathon · Jyväskylä’s marathon classic — participants fill Lutakko’s venues during race weekend · finlandiamarathon.fi',
          'Winter events: ice bar and light installations along the promenade',
        ],
      },
      features: [
        {
          icon: 'food',
          title: 'International Grand Markets',
          description: 'Vendors from 30+ countries fill Lutakonaukio 4–7 Jun 2026 — crafts, international food, children’s carnival. Free entry. eurooppamarkkinat.fi/jyvaskyla',
        },
        {
          icon: 'food',
          title: 'OlutSatama',
          description: '"Finland’s best beer event" 11–13 Jun 2026 on Lutakonaukio — 200+ breweries, food stalls and live gigs. 49,000+ visitors since 2016. olutsatama.fi',
        },
        {
          icon: 'stage',
          title: 'SuomiPop Festival',
          description: 'SuomiPop gathers dozens of artists and tens of thousands of visitors 9–11 Jul 2026 — mainstage on the shore, the Nordics’ most cinematic lake backdrop. suomipopfestivaali.fi/jyvaskyla',
        },
        {
          icon: 'rally',
          title: 'Secto Rally Finland',
          description: 'WRC round 30 Jul – 2 Aug 2026, Service Park at Paviljonki — walk right up to the machines roaring through the city. sectorallyfinland.fi',
        },
      ],
      cta: { label: 'Event calendar', href: '/dashboard/#calendar' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* 2. Food, Sauna & Nightlife                                          */
  /* ------------------------------------------------------------------ */
  {
    id: 'food-sauna',
    navLabel: { fi: 'Ruoka & Sauna', en: 'Dine & Sauna' },
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    themeRgbSecondary: [163, 230, 53],
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #a3e635 70%, #f8fafc 100%)',
    assets: {
      hero: {
        src: '/images/featured/food-sauna/hero.jpg',
        alt: {
          fi: 'Saunaravintola Sataman Viilu järven rannalla',
          en: 'Sauna restaurant Sataman Viilu by the lake',
        },
      },
      gallery: [
        {
          src: '/images/featured/food-sauna/gallery-1.jpg',
          alt: { fi: 'Viilun terassi ja löylyhuone', en: 'Viilu terrace and sauna pavilion' },
        },
        {
          src: '/images/featured/food-sauna/gallery-2.jpg',
          alt: { fi: 'Ravintolalaiva Gaia satamassa', en: 'Restaurant ship Gaia at the marina' },
        },
        {
          src: '/images/featured/food-sauna/sataman-kahvila.jpg',
          alt: { fi: 'Jyväskylän Sataman Kahvila vuoden 1919 puurakennuksessa', en: 'Jyväskylä Harbour Café in its 1919 timber building' },
        },
        {
          src: '/images/featured/food-sauna/gallery-3.jpg',
          alt: { fi: 'Rantaterassi aurinkoisena päivänä', en: 'Lakefront café terrace on a sunny day' },
        },
      ],
    },
    fi: {
      title: 'Maku ja löyly',
      subtitle: 'Saunaravintola Sataman Viilu, satamacafét ja iltaelämä',
      description:
        'Päivä alkaa kahvikupin ja höyryävän rantanäkymän äärellä, ja päättyy löylyihin sekä lähiruokaan Viilussa — Lutakon makumaailma on yhtä paljon arkkitehtuuria kuin gastronomiaa.',
      tagline: 'Pohjoismainen makumatka veden äärellä',
      section1: {
        title: 'Saunaravintola Sataman Viilu',
        subtitle:
          'Veden ylle kelluva puuarkkitehtuuri, järvinäköala 270°, savulohta ja siideriä — sauna on osa illallista.',
      },
      section2: {
        title: 'Aamukahvista myöhäisiltaan',
        subtitle:
          'Lutakon rantaraitin kahvilat tarjoilevat erikoiskahvit, brunssit ja jäätelöt; iltaan asti auki olevat ravintolat suunnittelevat menut kauden mukaan.',
      },
      section3: {
        title: 'Lutakon yöt',
        subtitle:
          'Ilokivi, Tanssisali Lutakko, terassit ja kelluvat baarit — sataman illat kantavat aamuun pyöräilijöiden ohitse.',
      },
      details: {
        title: 'Lutakon gastronominen reitti',
        desc: 'Yhdellä kävelyllä reitti vie pop-up-bistroista savusaunaan ja iltabaariin – tämä on kortteli, jota tehdään hitaasti.',
        bulletPoints: [
          'Saunaravintola Sataman Viilu · Alvar Aalto -museon naapurissa · satamanviilu.fi',
          'Konttiravintola Morton — "Se alkuperäinen Konttiravintola" satamassa, kesäkaudella auki · morton.fi',
          'M/S Musta Magia — Limanda-ravintolalaiva 200 hengelle, karaokea perjantaisin ja lauantaisin, sunnuntain livemusiikki · mustamagia.fi',
          'Ravintolalaivat Gaia ja Siipirataslaiva Vellamo — kelluvaa à la cartea järven äärellä',
          'Risteilyt Päijänteelle: M/S Rhea, M/S Hilja ja M/S Flamia (maailman ensimmäinen iglu-saunalaiva)',
          'Jyväskylän Sataman Kahvila — MatkaRhean ylläpitämä, vieraslaiturin vieressä Sataman Viilun naapurissa, avoinna joka päivä klo 10–20 huhtikuun alusta · msrhea.fi/jyvaskylan-sataman-kahvila',
          'Konttiravintola Waves Satamakatu 2 B — burgereita ja salaatteja Sandels-oluella, avoinna klo 10:30 alkaen',
          'HIISI Taproom & Bottleshop Lutakonaukio 3 — pienpanimon ravintola ja baari, lounas ma–pe 10:30–15 (15 €), à la carte iltaisin · hiisi.beer',
          'Trattoria Aukio Lutakonaukiolla',
          'Kauden makujen menut: kalaa Päijänteestä, sieniä lähimetsistä',
        ],
      },
      features: [
        {
          icon: 'sauna',
          title: 'Saunaravintola Sataman Viilu',
          description: 'Saaristolaisen makuinen menu ja jatkuvat löylyt — varaa pöytä auringonlaskuun.',
        },
        {
          icon: 'food',
          title: 'Ravintolalaiva Gaia',
          description: 'Historiallinen sisävesilaiva, jossa illallinen liikkuu ulapalle ja takaisin satamaan.',
        },
        {
          icon: 'food',
          title: 'M/S Musta Magia',
          description: '"Tervetuloa nauttimaan laivan antimista!" Limanda-ravintolalaiva 200 hengelle: karaokea perjantaisin ja lauantaisin (Mikon Karaoke), sunnuntaisin livemusiikkia ja terassikansi järven yllä. mustamagia.fi',
        },
        {
          icon: 'food',
          title: 'Konttiravintola Morton',
          description: '"Se alkuperäinen Konttiravintola" Lutakon satamassa Satamakatu 2:ssa. Ravintola, kahvila ja terassi kesäkaudella; Wolt-toimitukset koteihin. morton.fi',
        },
        {
          icon: 'food',
          title: 'Jyväskylän Sataman Kahvila',
          description: 'Vuonna 1919 rakennetussa keltaisessa puurakennuksessa vieraslaiturin vieressä — MatkaRhean ylläpitämä kahvila, jossa tuoreita leivonnaisia, jäätelöä ja ranta-anniskelua joka päivä klo 10–20 huhtikuun alusta. "Tervetuloa viihtymään." msrhea.fi',
        },
        {
          icon: 'food',
          title: 'Konttiravintola Waves',
          description: 'Satamakatu 2 B — burgereita ja salaatteja kontti-ravintolasta, Sandels-olutkumppani. Avoinna klo 10:30 alkaen. Google-arvio 4,4/5 (86 arviota). 050 366 6736',
        },
        {
          icon: 'food',
          title: 'HIISI Taproom & Bottleshop',
          description: 'Lutakonaukio 3 — pienpanimon ravintola, baari ja pullopuoti yhdessä. Arkilounas 15 € (ma–pe 10:30–15), à la carte iltaisin (GF & vegaani), bottleshop auki 21:00 saakka. taproom@hiisi.beer · hiisi.beer',
        },
        {
          icon: 'sauna',
          title: 'Julkinen rantasauna',
          description: 'Avantouintia talvella, palju ja pesäkivisauna ympäri vuoden – vain muutaman askeleen päässä Viilusta.',
        },
      ],
      cta: { label: 'Varaa saunalautta', href: '/dashboard/#calendar' },
    },
    en: {
      title: 'Taste & steam',
      subtitle: 'Sauna restaurant Sataman Viilu, harbour cafés and nightlife',
      description:
        'Mornings start with espresso and a steamy lake view, evenings end with sauna heat and locally sourced dishes at Viilu — Lutakko’s flavours are as much architecture as gastronomy.',
      tagline: 'A Nordic flavour journey by the water',
      section1: {
        title: 'Sauna restaurant Sataman Viilu',
        subtitle:
          'A timber pavilion hovering over the lake, a 270° view, smoked salmon and craft cider — sauna is part of dinner.',
      },
      section2: {
        title: 'From morning coffee to midnight',
        subtitle:
          'Cafés along the promenade serve specialty coffee, brunch and gelato; the late-evening kitchens design seasonal menus.',
      },
      section3: {
        title: 'Lutakko nights',
        subtitle:
          'Ilokivi, Tanssisali Lutakko, terraces and floating bars — harbour evenings stretch until dawn cyclists pass by.',
      },
      details: {
        title: 'The gastronomic route through Lutakko',
        desc: 'One walk takes you from pop-up bistros to smoke-sauna to a late-night bar – this is a district built to be lingered in.',
        bulletPoints: [
          'Sauna restaurant Sataman Viilu · neighbour to the Alvar Aalto museum · satamanviilu.fi',
          'Konttiravintola Morton — "the original container restaurant" right at the harbour, open through the summer season · morton.fi',
          'M/S Musta Magia — the Limanda restaurant ship at the harbour, 200-seat capacity, karaoke on Fridays & Saturdays and live music on Sundays · mustamagia.fi',
          'Restaurant ship Gaia and the paddle-wheeler Vellamo — floating à la carte by the lake',
          'Lake Päijänne cruises aboard M/S Rhea, M/S Hilja and M/S Flamia (the world’s first igloo-sauna boat)',
          'Jyväskylä Harbour Café (Sataman Kahvila) — run by MatkaRhea right next to the guest dock and Sataman Viilu, open daily 10:00–20:00 from April · msrhea.fi/jyvaskylan-sataman-kahvila',
          'Konttiravintola Waves at Satamakatu 2 B — burgers and salads with Sandels beer, open from 10:30',
          'HIISI Taproom & Bottleshop at Lutakonaukio 3 — microbrewery restaurant and bar, weekday lunch 10:30–15:00 (€15), à la carte evenings · hiisi.beer',
          'Trattoria Aukio on Lutakonaukio',
          'Seasonal menus: Päijänne fish, foraged mushrooms',
        ],
      },
      features: [
        {
          icon: 'sauna',
          title: 'Sauna restaurant Sataman Viilu',
          description: 'An archipelago-inspired menu and continuous löyly — book a table to catch the sunset.',
        },
        {
          icon: 'food',
          title: 'Restaurant ship Gaia',
          description: 'Historic inland steamer where dinner sails out onto the lake and returns to the marina.',
        },
        {
          icon: 'food',
          title: 'M/S Musta Magia',
          description: '"Welcome to enjoy the ship’s offerings!" The Limanda restaurant ship seats 200: Karaoke on Fridays & Saturdays (Mikon Karaoke), live music on Sundays, and a terrace deck right above the lake. mustamagia.fi',
        },
        {
          icon: 'food',
          title: 'Konttiravintola Morton',
          description: '"The original container restaurant" at Lutakko harbour, Satamakatu 2. Restaurant, café and terrace through the summer season; Wolt delivery to your home. morton.fi',
        },
        {
          icon: 'food',
          title: 'Jyväskylä Harbour Café',
          description: 'Set in a 1919 yellow timber building right by the guest dock — MatkaRhea’s café serves fresh pastries, ice cream and licensed drinks daily 10:00–20:00 from April onwards. "Welcome to enjoy yourself." msrhea.fi',
        },
        {
          icon: 'food',
          title: 'Konttiravintola Waves',
          description: 'Satamakatu 2 B — burgers and salads from a container, Sandels beer partner. Open from 10:30. 4.4/5 on Google (86 reviews). 050 366 6736',
        },
        {
          icon: 'food',
          title: 'HIISI Taproom & Bottleshop',
          description: 'Lutakonaukio 3 — microbrewery restaurant, bar and bottle shop in one. Weekday lunch €15 (Mon–Fri 10:30–15), à la carte evenings (GF & vegan options), bottleshop open until 21:00. taproom@hiisi.beer · hiisi.beer',
        },
        {
          icon: 'sauna',
          title: 'Public lakefront sauna',
          description: 'Ice swimming in winter, hot tub and wood sauna year-round — steps from Viilu.',
        },
      ],
      cta: { label: 'Book a sauna raft', href: '/dashboard/#calendar' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* 3. Marina, Sports & Family Recreation                               */
  /* ------------------------------------------------------------------ */
  {
    id: 'marina-recreation',
    navLabel: { fi: 'Kulttuuri & liikunta', en: 'Culture & sports' },
    themeColor: '#a3e635',
    themeRgb: [163, 230, 53],
    themeRgbSecondary: [34, 211, 238],
    gradient: 'linear-gradient(135deg, #a3e635 0%, #22d3ee 65%, #a78bfa 100%)',
    assets: {
      hero: {
        src: '/images/featured/marina-recreation/hero.jpg',
        alt: { fi: 'Lutakon vierasvenesatama', en: 'Lutakko guest marina' },
      },
      gallery: [
        {
          src: '/images/featured/marina-recreation/gallery-1.jpg',
          alt: { fi: 'Satama auringonlaskun aikaan', en: 'The marina at sunset' },
        },
        {
          src: '/images/featured/marina-recreation/gallery-2.jpg',
          alt: { fi: 'Lutakko talvella', en: 'Lutakko in winter' },
        },
        {
          src: '/images/featured/marina-recreation/gallery-3.jpg',
          alt: { fi: 'Rantapromenadi ja näköalaterassi', en: 'Promenade and observation terrace' },
        },
      ],
    },
    fi: {
      title: 'Kulttuuri ja liike',
      subtitle: 'Klubit, kuntosalit, marathon, marina ja rantaraitti',
      description:
        'Lutakossa kulttuuri ja liikunta kohtaavat: legendaarinen rock-klubi vanhassa teollisuusrakennuksessa, yksityiskuntosali Lutakonaukion laidalla, marathon-klassikko, Päijänteen vierasvenesatama ja 13 km esteetön rantareitti.',
      tagline: 'Konsertit, kuntosalit ja kilometrit veden äärellä',
      section1: {
        title: 'Tanssisali Lutakko',
        subtitle:
          'Jelmu ry:n legendaarinen rock-klubi 1900-luvun alun teollisuusrakennuksessa Lutakonaukion laidalla.',
      },
      section2: {
        title: 'Liike ja liikunta',
        subtitle:
          'Reserved Gym -yksityiskuntosali, Finlandia Marathon, beach volley, ulkokuntosali ja Gr8 Wake -vesiurheilukeskus.',
      },
      section3: {
        title: 'Rantaraitti ja vierasvenesatama',
        subtitle:
          'Jyväskylän Rantaraitti — 13 km esteetön reitti — lähtee satamasta; vieraslaiturilla 46 paikkaa, Kuokkalan silta kaartuu yli järven.',
      },
      details: {
        title: 'Lutakon kulttuuri- ja liikunta-infra',
        desc: 'Konsertit, kuntosalivuorot, Päijänteen sisäsatama ja perheen piknikniityt jakavat saman rantapromenadin.',
        bulletPoints: [
          'Tanssisali Lutakko · Jelmu ry:n legendaarinen rock-klubi vanhassa Lutakon teollisuusrakennuksessa · jelmu.net',
          'Reserved Gym · Yksityinen kuntosali Lutakonaukio 1:ssä, tuntivaraus (ei kuukausimaksua) · reservedgym.fi',
          'Finlandia Marathon · Jyväskylän marathon-klassikko (osallistujat täyttävät Lutakon palvelut) · finlandiamarathon.fi',
          'Vierasvenesatama: 46 paikkaa, sähkö, vesi, polttoaine — Vuoden vierassatama 2017 -kunniamaininta',
          'Beach volley, ulkokuntosali, kuntoporras ja Gr8 Wake -vesiurheilukeskus (wakeboard, SUP, vesipuisto)',
          'Lasten leikki- ja vesileikkialueet Lutakonaukiolla',
          'Jyväskylän Rantaraitti — 13 km esteetön rantareitti lähtee satamasta; Kuokkalan silta kaartuu yli järven',
          'Satamassa pysyvä Alvar Aalto -venenäyttely; arkkitehtuurireitti Aalto-museolle ja Saunaravintola Sataman Viilun puuarkkitehtuuriin',
        ],
      },
      features: [
        {
          icon: 'stage',
          title: 'Tanssisali Lutakko',
          description: 'Suomen rakastetuin underground-konserttipaikka 1900-luvun alun teollisuusrakennuksessa Lutakonaukion laidalla. Jelmu ry:n ohjelmistossa rockia, punkia, metallia ja indietä ympäri vuoden — jelmu.net.',
        },
        {
          icon: 'sports',
          title: 'Reserved Gym',
          description: '"Yksityinen kuntosali Jyväskylän keskustassa" — Lutakonaukio 1, tuntivaraus (ei kuukausimaksua), panoraamanäkymä aukiolle. Sopii personal trainereille. reservedgym.fi',
        },
        {
          icon: 'sports',
          title: 'Finlandia Marathon',
          description: 'Jyväskylän marathon-klassikko — osallistujat ja kannustajat täyttävät Lutakon ravintolat ja saunat tapahtumaviikonloppuna. finlandiamarathon.fi',
        },
        {
          icon: 'marina',
          title: 'Vierasvenesatama',
          description: '46 vieraspaikkaa Päijänteen pohjoisimmassa matkustajasatamassa — sähkö, vesi, polttoaine ja saunavuoroja, kävelymatkan päässä kaupungin keskustasta.',
        },
        {
          icon: 'sports',
          title: 'Beach volley & Gr8 Wake',
          description: 'Rantakentät ja Gr8 Wake -vesiurheilukeskus (wakeboard, SUP, vesipuisto) — kaikki kävelymatkan päässä toisistaan.',
        },
        {
          icon: 'viilu',
          title: 'Arkkitehtuurin polku',
          description: 'Satamassa pysyvä Alvar Aalto -venenäyttely; arkkitehtuurin reitti vie Aalto-museolle ja Saunaravintola Sataman Viilun puuarkkitehtuuriin.',
        },
      ],
      cta: { label: 'Suunnittele päivä', href: '#marina-recreation' },
    },
    en: {
      title: 'Culture and motion',
      subtitle: 'Clubs, gyms, the marathon, the marina and the Rantaraitti',
      description:
        'In Lutakko, culture meets motion: a legendary rock club in a heritage industrial building, a private gym on Lutakonaukio, a marathon classic, Päijänne’s guest marina and a 13 km accessible lakeside trail.',
      tagline: 'Gigs, gyms and kilometres by the water',
      section1: {
        title: 'Tanssisali Lutakko',
        subtitle:
          'Jelmu ry’s legendary rock club in an early-1900s heritage industrial building beside Lutakonaukio square.',
      },
      section2: {
        title: 'Movement and sport',
        subtitle:
          'Reserved Gym private gym, Finlandia Marathon, beach volleyball, outdoor gym and Gr8 Wake water-sports centre.',
      },
      section3: {
        title: 'Rantaraitti and the guest marina',
        subtitle:
          'Jyväskylä Rantaraitti — a 13 km accessible trail — begins at the harbour; 46 guest berths at the marina, Kuokkala bridge arching across the lake.',
      },
      details: {
        title: 'Lutakko culture & sports infrastructure',
        desc: 'Concerts, gym slots, an inland-Päijänne harbour and family picnic meadows share the same waterfront promenade.',
        bulletPoints: [
          'Tanssisali Lutakko · Jelmu’s legendary rock club in a heritage industrial building beside Lutakonaukio · jelmu.net',
          'Reserved Gym · private hourly-booked gym at Lutakonaukio 1 (no monthly fee) · reservedgym.fi',
          'Finlandia Marathon · Jyväskylä’s marathon classic — participants fill Lutakko’s venues during race weekend · finlandiamarathon.fi',
          'Guest marina: 46 berths with shore power, water, fuel and sauna access — 2017 Guest Harbour of the Year honourable mention',
          'Beach volleyball, outdoor gym, stairs run and Gr8 Wake water-sports centre (wakeboard, SUP, water park)',
          'Children’s play and water-play areas at Lutakonaukio',
          'Picnic meadows and grill spots by the water',
          'Jyväskylä Rantaraitti — the 13 km accessible lakeside trail starts at the marina; Kuokkala bridge arches across the lake',
        ],
      },
      features: [
        {
          icon: 'stage',
          title: 'Tanssisali Lutakko',
          description: 'Finland’s most beloved underground gig venue, set in an early-1900s heritage industrial building right by Lutakonaukio square. Jelmu programmes rock, punk, metal and indie all year — jelmu.net.',
        },
        {
          icon: 'sports',
          title: 'Reserved Gym',
          description: '"A private gym in the heart of Jyväskylä" — Lutakonaukio 1, hourly booking (no monthly fees), panoramic view over the square. Ideal for personal trainers. reservedgym.fi',
        },
        {
          icon: 'sports',
          title: 'Finlandia Marathon',
          description: 'Jyväskylä’s marathon classic — runners and supporters fill Lutakko’s restaurants and saunas during race weekend. finlandiamarathon.fi',
        },
        {
          icon: 'marina',
          title: 'Guest marina',
          description: '46 guest berths in Päijänne’s northernmost passenger harbour — shore power, water, fuel and sauna access, all within a short walk of downtown.',
        },
        {
          icon: 'sports',
          title: 'Beach volley & Gr8 Wake',
          description: 'Shoreline courts and the Gr8 Wake water-sports centre (wakeboard, SUP, water park) — all within walking distance of one another.',
        },
        {
          icon: 'viilu',
          title: 'The architecture trail',
          description: 'A permanent Alvar Aalto-designed boat is displayed at the harbour, and the architecture route leads to the Aalto Museum and the timber pavilion of Sauna restaurant Sataman Viilu.',
        },
      ],
      cta: { label: 'Plan a day', href: '#marina-recreation' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* 4. Business — Kielo office buildings                                */
  /* ------------------------------------------------------------------ */
  {
    id: 'business',
    navLabel: { fi: 'Business', en: 'Business' },
    themeColor: '#a78bfa',
    themeRgb: [167, 139, 250],
    themeRgbSecondary: [34, 211, 238],
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 60%, #a3e635 100%)',
    assets: {
      hero: {
        src: '/images/featured/business/hero.jpg',
        alt: { fi: 'Innova-toimistorakennukset Lutakossa', en: 'Innova office buildings in Lutakko' },
      },
      gallery: [
        {
          src: '/images/featured/business/gallery-1.jpg',
          alt: { fi: 'Innova 1 — Piippukatu 11', en: 'Innova 1 — Piippukatu 11' },
        },
        {
          src: '/images/featured/business/gallery-2.jpg',
          alt: { fi: 'Innova 2 — Lutakonaukio 7', en: 'Innova 2 — Lutakonaukio 7' },
        },
        {
          src: '/images/featured/business/gallery-3.jpg',
          alt: { fi: 'Innova 4 — Lutakonaukio 1', en: 'Innova 4 — Lutakonaukio 1' },
        },
      ],
    },
    fi: {
      title: 'Lutakon yrityskortteli',
      subtitle: 'Jyväskylän Paviljonki + Innova 1, 2 ja 4 — tapahtumatalo ja kestävät toimitilat saman korttelin sisällä',
      description:
        'Lutakko on Jyväskylän nopeimmin kasvava liike-elämän kortteli. Jyväskylän Paviljonki — "Suomen monipuolisin tapahtumatalo" — toimii alueen sydämenä, ja sen ympärillä kolme sertifioitua Innova-toimistorakennusta tarjoaa joustavia tiloja startupeille ja kasvuyhtiöille. Sauna, ravintola, kokoustilat ja sähköauton lataus kaikissa.',
      tagline: 'Messut, kokoukset ja kasvuyhtiöt — vihreällä energialla',
      section1: {
        title: 'Jyväskylän Paviljonki',
        subtitle:
          '"Suomen monipuolisin tapahtumatalo" Lutakonaukio 12:ssa — messut, kongressit, konsertit, gaalat ja Secto Rally Finlandin Servicepark.',
      },
      section2: {
        title: 'Innova 1, 2 & 4 — Kielo Toimitilat',
        subtitle:
          'Kolme sertifioitua toimistorakennusta Paviljongin ympärillä — BREEAM Very Good, LEED Platinum ja LEED Gold; sauna, ravintola, kokoustilat ja sähköauton lataus kaikissa.',
      },
      section3: {
        title: 'Yritysverkosto Paviljongin ympärillä',
        subtitle:
          'Reserved Gym (Innova 4:ssä), Ravintola Fiilu (Innova 1:ssä) ja kymmeniä yrityksiä kävelymatkan päässä — kaikki tapahtumatalon ja festivaalikorttelin tuntumassa.',
      },
      details: {
        title: 'Tapahtumat ja toimitilat Lutakossa',
        desc: 'Paviljonki ja Innova-toimistot muodostavat yhdessä Lutakon yritysverkoston — yhteistyö Lutakko.infon kanssa avaa kanavan uusiin vuokralaisiin, messukävijöihin ja kongressiyleisöön.',
        bulletPoints: [
          'Jyväskylän Paviljonki · Lutakonaukio 12 · "Suomen monipuolisin tapahtumatalo" · paviljonki.fi · +358 14 339 8100',
          'Innova 1 · Piippukatu 11 · BREEAM Very Good · kielotoimitilat.fi/property/piippukatu-11',
          'Innova 2 · Lutakonaukio 7 · LEED Platinum · vapaina 112/163/166 m² · kielotoimitilat.fi/property/lutakonaukio-7',
          'Innova 4 · Lutakonaukio 1 · LEED Gold · vapaina 51/69 m² · kielotoimitilat.fi/property/lutakonaukio-1',
          'Toimitilojen vuokrauskanava: Minna Hämäläinen +358 40 564 8042 · minna.hamalainen@kielotoimitilat.fi',
          'Kaikki rakennukset: 100 % vihreä energia, sähköauton lataus, sauna, kokoustilat',
          'Paviljongin toistuvat tapahtumat 2026: Cheerleading SM 13.–14.6., BUS-messut 16.–17.6., Secto Rally Finland Servicepark 30.7.–2.8., Jyväskylä Sinfonia',
        ],
      },
      features: [
        {
          icon: 'stage',
          title: 'Jyväskylän Paviljonki',
          description: '"Suomen monipuolisin tapahtumatalo" Lutakonaukio 12:ssa — messut, kongressit, konsertit ja Secto Rally Finlandin Servicepark. Operaattori Jyväskylän Messut Oy + Paviljonki Productions. paviljonki.fi',
        },
        {
          icon: 'viilu',
          title: 'Innova 1 (Piippukatu 11)',
          description: 'Kielon edustava lippulaiva: BREEAM Very Good, ravintola Fiilu, kokouskeskus ja sauna "Lutakon Huippu". 400 m juna-asemalle. kielotoimitilat.fi',
        },
        {
          icon: 'viilu',
          title: 'Innova 2 (Lutakonaukio 7)',
          description: 'LEED Platinum -kuusikerroksinen toimistorakennus Jyväsjärven rannassa. Vapaina nyt 112 m², 163 m² ja 166 m² yksiköt.',
        },
        {
          icon: 'viilu',
          title: 'Innova 4 (Lutakonaukio 1)',
          description: 'LEED Gold; 51 m² ja 69 m² toimistot vapaina. Samassa rakennuksessa Reserved Gym ja ruokakauppa; sauna järvinäkymin.',
        },
        {
          icon: 'food',
          title: 'Ravintola Fiilu (Innova 1)',
          description: 'Päivittäinen lounaslista Innova 1:n alakerrassa — kävelymatkan päässä kaikista kolmesta Innova-rakennuksesta ja Paviljongista.',
        },
        {
          icon: 'sports',
          title: 'Reserved Gym (Innova 4)',
          description: 'Yksityinen tuntivaraus-kuntosali samassa rakennuksessa kuin Innova 4 — panoraamanäkymä Lutakonaukiolle. reservedgym.fi',
        },
      ],
      cta: { label: 'Pyydä vuokratarjous', href: '#business' },
    },
    en: {
      title: 'Lutakko business district',
      subtitle: 'Jyväskylän Paviljonki + Innova 1, 2 and 4 — Finland’s most versatile event house and the surrounding sustainable office buildings',
      description:
        'Lutakko is Jyväskylä’s fastest-growing business block. Jyväskylän Paviljonki — "Finland’s most versatile event house" — sits at the heart of the district, surrounded by three certified Innova office buildings offering flexible space for startups and growth companies. Sauna, restaurant, meeting rooms and EV charging across the lot.',
      tagline: 'Trade fairs, meetings and growth companies — on green energy',
      section1: {
        title: 'Jyväskylän Paviljonki',
        subtitle:
          '"Finland’s most versatile event house" at Lutakonaukio 12 — trade fairs, congresses, concerts, galas and the Secto Rally Finland Service Park.',
      },
      section2: {
        title: 'Innova 1, 2 & 4 — Kielo Toimitilat',
        subtitle:
          'Three certified office buildings around Paviljonki — BREEAM Very Good, LEED Platinum and LEED Gold; sauna, restaurant, meeting rooms and EV charging in every building.',
      },
      section3: {
        title: 'Business network around Paviljonki',
        subtitle:
          'Reserved Gym (in Innova 4), Fiilu restaurant (in Innova 1) and dozens of companies within walking distance — all next to the event house and the festival district.',
      },
      details: {
        title: 'Events and offices in Lutakko',
        desc: 'Paviljonki and the Innova buildings form Lutakko’s business network — partnering with Lutakko.info opens a channel to new tenants, fair visitors and congress audiences alike.',
        bulletPoints: [
          'Jyväskylän Paviljonki · Lutakonaukio 12 · "Finland’s most versatile event house" · paviljonki.fi · +358 14 339 8100',
          'Innova 1 · Piippukatu 11 · BREEAM Very Good · kielotoimitilat.fi/property/piippukatu-11',
          'Innova 2 · Lutakonaukio 7 · LEED Platinum · available 112/163/166 m² · kielotoimitilat.fi/property/lutakonaukio-7',
          'Innova 4 · Lutakonaukio 1 · LEED Gold · available 51/69 m² · kielotoimitilat.fi/property/lutakonaukio-1',
          'Office leasing channel: Minna Hämäläinen +358 40 564 8042 · minna.hamalainen@kielotoimitilat.fi',
          'Across all buildings: 100% green energy, EV charging, sauna, meeting rooms',
          'Paviljonki recurring events 2026: Cheerleading SM 13–14 Jun, BUS trade fair 16–17 Jun, Secto Rally Finland Service Park 30 Jul – 2 Aug, Jyväskylä Sinfonia',
        ],
      },
      features: [
        {
          icon: 'stage',
          title: 'Jyväskylän Paviljonki',
          description: '"Finland’s most versatile event house" at Lutakonaukio 12 — trade fairs, congresses, concerts and the Secto Rally Finland Service Park. Operated by Jyväskylän Messut Oy + Paviljonki Productions. paviljonki.fi',
        },
        {
          icon: 'viilu',
          title: 'Innova 1 (Piippukatu 11)',
          description: 'Kielo’s flagship: BREEAM Very Good, Fiilu restaurant, conference centre and "Lutakon Huippu" sauna. 400 m to the train station. kielotoimitilat.fi',
        },
        {
          icon: 'viilu',
          title: 'Innova 2 (Lutakonaukio 7)',
          description: 'LEED Platinum six-storey office building on the Jyväsjärvi shore. Available right now: 112 m², 163 m² and 166 m² units.',
        },
        {
          icon: 'viilu',
          title: 'Innova 4 (Lutakonaukio 1)',
          description: 'LEED Gold; 51 m² and 69 m² offices available. The building also houses Reserved Gym and a grocery store; lake-view sauna.',
        },
        {
          icon: 'food',
          title: 'Fiilu restaurant (Innova 1)',
          description: 'Daily lunch downstairs in Innova 1 — walking distance from all three Innova buildings and Paviljonki.',
        },
        {
          icon: 'sports',
          title: 'Reserved Gym (Innova 4)',
          description: 'Hourly-booked private gym in the same building as Innova 4 — panoramic view over Lutakonaukio square. reservedgym.fi',
        },
      ],
      cta: { label: 'Request a leasing offer', href: '#business' },
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  AUTH COPY                                                                 */
/* -------------------------------------------------------------------------- */

export const AUTH_COPY = {
  fi: {
    open: 'Kirjaudu',
    openShort: 'Kirjaudu',
    accountMenu: 'Tilini',
    signOut: 'Kirjaudu ulos',
    title: 'Tervetuloa Lutakon Satamaan',
    sub:
      'Tallenna suosikkitapahtumat, varaa pöytä Viilussa tai liity vierasvenesataman kanta-asiakkaaksi.',
    tabSignIn: 'Kirjaudu',
    tabSignUp: 'Luo tili',
    tabMagic: 'Taikalinkki',
    email: 'Sähköposti',
    emailPlaceholder: 'nimi@osoitteesi.fi',
    password: 'Salasana',
    passwordPlaceholder: 'Vähintään 8 merkkiä',
    submitSignIn: 'Kirjaudu sisään',
    submitSignUp: 'Luo tili',
    submitMagic: 'Lähetä taikalinkki',
    orDivider: 'tai',
    magicHint: 'Lähetämme kertakäyttöisen kirjautumislinkin sähköpostiisi.',
    notConfigured:
      'Kirjautuminen aktivoidaan pian — palvelin yhdistetään käyttöönoton yhteydessä.',
    needConfirm:
      'Lähetimme vahvistuslinkin sähköpostiisi. Avaa viesti ja viimeistele rekisteröinti.',
    needMagic: 'Avaa sähköpostiviesti ja klikkaa lähetettyä linkkiä.',
    close: 'Sulje',
    legal:
      'Jatkamalla hyväksyt käyttöehdot ja tietosuojaselosteen.',
    fields: {
      missing: 'Täytä molemmat kentät jatkaaksesi.',
      shortPassword: 'Salasanan on oltava vähintään 8 merkkiä.',
      badEmail: 'Tarkista sähköpostiosoitteen muoto.',
    },
    callback: {
      working: 'Vahvistetaan tunnistautumista…',
      success: 'Onnistui! Olet kirjautunut sisään.',
      failure: 'Linkki on vanhentunut tai virheellinen. Pyydä uusi.',
      back: 'Takaisin etusivulle',
    },
  },
  en: {
    open: 'Sign in',
    openShort: 'Sign in',
    accountMenu: 'Account',
    signOut: 'Sign out',
    title: 'Welcome to Lutakon Satama',
    sub:
      'Save favourite events, reserve a table at Viilu, or join the guest marina’s frequent-visitor programme.',
    tabSignIn: 'Sign in',
    tabSignUp: 'Create account',
    tabMagic: 'Magic link',
    email: 'Email',
    emailPlaceholder: 'you@email.com',
    password: 'Password',
    passwordPlaceholder: 'At least 8 characters',
    submitSignIn: 'Sign in',
    submitSignUp: 'Create account',
    submitMagic: 'Send magic link',
    orDivider: 'or',
    magicHint: 'We will email you a one-time sign-in link.',
    notConfigured:
      'Sign-in opens up shortly — the backend is being connected at launch.',
    needConfirm:
      'Confirmation link sent to your inbox. Open it to finish signing up.',
    needMagic: 'Check your inbox and click the link we just sent.',
    close: 'Close',
    legal: 'By continuing you accept the terms of service and privacy policy.',
    fields: {
      missing: 'Please fill in both fields to continue.',
      shortPassword: 'Password must be at least 8 characters.',
      badEmail: 'Double-check the email format.',
    },
    callback: {
      working: 'Confirming your identity…',
      success: 'Success — you are signed in.',
      failure: 'That link is expired or invalid. Request a new one.',
      back: 'Back to home',
    },
  },
} as const;

export const FOOTER_LINKS = {
  fi: {
    explore: 'Tutustu',
    plan: 'Suunnittele käyntisi',
    follow: 'Seuraa meitä',
    newsletter: {
      title: 'Tapahtumat suoraan sähköpostiisi',
      desc:
        'Tilaa Lutakon Sataman uutiskirje – uudet tapahtumat, ravintolat ja kausiohjelma kerran kuussa.',
      placeholder: 'sähkö@osoitteesi.fi',
      button: 'Tilaa',
    },
    rights: 'Kaikki oikeudet pidätetään.',
    location: 'Voon IQ · info@voon.fi',
  },
  en: {
    explore: 'Explore',
    plan: 'Plan your visit',
    follow: 'Follow us',
    newsletter: {
      title: 'Events straight to your inbox',
      desc:
        'Subscribe to Lutakon Satama newsletter — new events, restaurants and seasonal programme once a month.',
      placeholder: 'you@email.com',
      button: 'Subscribe',
    },
    rights: 'All rights reserved.',
    location: 'Voon IQ · info@voon.fi',
  },
} as const;
