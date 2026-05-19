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
      title: 'Vesi tekee tästä paikan',
      sub:
        'Päijänteen pohjoinen päätesatama avautuu suoraan kaupungin sydämeen. Veneet, rantapromenadi ja pyöräilijät kohtaavat samalla aukiolla.',
    },
    beat3: {
      title: 'Lavat, löylyt, lyhdyt',
      sub:
        'OlutSatama 11.–13.6.2026, SuomiPop 9.–11.7.2026, Secto Rally Finland 30.7.–2.8.2026, viikoittaisia konsertteja Tanssisali Lutakon lavalla — ja Saunaravintola Sataman Viilu vastapäätä järveä.',
    },
    beat4: {
      title: 'Yksi kortteli, kaikki vuodenajat',
      sub:
        'Aamukahveista myöhäisiin DJ-iltoihin, kesäpurjehduksista talven jääbaariin. Lutakko ei lopu koskaan.',
    },
    floor: 'Vieritä alas — tarinan kolme lukua odottavat',
  },
  en: {
    eyebrow: 'Jyväskylä · Lutakko',
    beat1: {
      title: 'Lutakon Satama',
      sub: 'Finland’s most alive lakeshore quarter — festivals, restaurants, marina and sauna.',
    },
    beat2: {
      title: 'The water makes the place',
      sub:
        'Päijänte’s northern terminus opens straight into the city centre. Yachts, the promenade and cyclists meet on the same square.',
    },
    beat3: {
      title: 'Stages, steam, lanterns',
      sub:
        'OlutSatama 11–13 Jun 2026, SuomiPop 9–11 Jul 2026, Secto Rally Finland 30 Jul – 2 Aug 2026, weekly gigs at Tanssisali Lutakko — and Sauna restaurant Sataman Viilu just across the water.',
    },
    beat4: {
      title: 'One block, every season',
      sub:
        'From morning coffees to late-night DJ sets, from summer sailing to a winter ice bar. Lutakko never closes.',
    },
    floor: 'Scroll down — three chapters await',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  SITE-WIDE COPY                                                            */
/* -------------------------------------------------------------------------- */

export const SITE_META = {
  fi: {
    name: 'Lutakon Satama',
    tagline: 'Suomen elämyksellisin satama',
    description:
      'Päijänteen pohjoisin matkustajasatama Jyväskylän sydämessä — festivaaleja, ravintolalaivoja, saunaa, vesiurheilua ja perheaktiviteetteja Lutakonaukion ja rantaraitin tuntumassa.',
  },
  en: {
    name: 'Lutakon Satama',
    tagline: 'Finland’s most experiential harbour',
    description:
      'Päijänne’s northernmost passenger harbour at the heart of Jyväskylä — festivals, restaurant ships, sauna, water sports and family activities along Lutakonaukio square and the lakeside promenade.',
  },
} as const;

export const NAV_LINKS: Array<{ key: string; fi: string; en: string }> = [
  { key: 'festivals-culture', fi: 'Kulttuuri', en: 'Culture' },
  { key: 'food-sauna',        fi: 'Ruoka & Sauna', en: 'Dine & Sauna' },
  { key: 'marina-recreation', fi: 'Satama & Perhe', en: 'Marina & Family' },
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
      { slug: 'secto-rally', fi: 'Ralli',    en: 'Rally' },
      { slug: 'suomipop',    fi: 'SuomiPop', en: 'SuomiPop' },
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
      { slug: 'trattoria-aukio', fi: 'Trattoria Aukio', en: 'Trattoria Aukio' },
      { slug: 'musta-magia',     fi: 'M/S Musta Magia', en: 'M/S Musta Magia' },
      { slug: 'hiisi',           fi: 'HIISI-panimo',    en: 'HIISI Brewery' },
      { slug: 'gaia',            fi: 'Gaia',            en: 'Gaia' },
    ],
  },
  {
    key: 'culture-sports',
    fi: 'Kulttuuri & liikunta',
    en: 'Culture & sports',
    items: [
      { slug: 'tanssisali-lutakko', fi: 'Tanssisali Lutakko', en: 'Tanssisali Lutakko' },
      { slug: 'finlandia-marathon', fi: 'Finlandia Marathon', en: 'Finlandia Marathon' },
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
    navLabel: { fi: 'Kulttuuri & Rallit', en: 'Culture & Rallies' },
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
          'OlutSatama 11.–13.6.2026 Lutakonaukiolla · "Suomen paras olut-tapahtuma", 200+ panimoa · olutsatama.fi',
          'SuomiPop Festival 9.–11.7.2026 Jyväskylässä · liput suomipopfestivaali.fi/jyvaskyla/liput',
          'Secto Rally Finland 30.7.–2.8.2026 Jyväskylässä · Servicepark Paviljongilla · sectorallyfinland.fi',
          'Tanssisali Lutakko · Jelmu ry:n legendaarinen rock-klubi vanhassa Lutakon teollisuusrakennuksessa · jelmu.net',
          'Kesäteatteri ja street food -tapahtumat Lutakonaukiolla',
          'Talvitapahtumat: jääbaari ja valoinstallaatiot rantapromenadilla',
        ],
      },
      features: [
        {
          icon: 'stage',
          title: 'Päälava rannalla',
          description: 'Pohjoismaiden komein järvinäkymä esiintyjien takana — auringonlasku osana showta.',
        },
        {
          icon: 'rally',
          title: 'Secto Rally Finland Servicepark',
          description: 'WRC-tallit Paviljongin pihalla 30.7.–2.8.2026 – pääset lähelle koneita, joiden ääni täyttää koko kaupungin.',
        },
        {
          icon: 'stage',
          title: 'Tanssisali Lutakko',
          description: 'Suomen rakastetuin underground-konserttipaikka 1900-luvun alun teollisuusrakennuksessa Lutakonaukion laidalla. Jelmu ry:n ohjelmistossa rockia, punkia, metallia ja indietä ympäri vuoden — jelmu.net.',
        },
        {
          icon: 'food',
          title: 'OlutSatama',
          description: 'Suomen paras olut-tapahtuma 11.–13.6.2026 Lutakonaukiolla — yli 200 panimoa, ruokapisteitä ja keikkoja. 49 000+ kävijää vuodesta 2016. olutsatama.fi',
        },
        {
          icon: 'food',
          title: 'Pop-up street food',
          description: 'Aukio täyttyy ruoka-autoista ja pienpanimoista festivaalien aikaan.',
        },
      ],
      cta: { label: 'Selaa tapahtumia', href: '#events' },
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
          'OlutSatama — 11–13 Jun 2026 on Lutakonaukio · "Finland’s best beer event", 200+ breweries · olutsatama.fi',
          'SuomiPop Festival — 9–11 Jul 2026 in Jyväskylä · tickets at suomipopfestivaali.fi/jyvaskyla/liput',
          'Secto Rally Finland — 30 Jul – 2 Aug 2026 in Jyväskylä · Service Park at Paviljonki · sectorallyfinland.fi',
          'Tanssisali Lutakko · Jelmu’s legendary rock club in a heritage industrial building beside Lutakonaukio · jelmu.net',
          'Summer theatre & street food on Lutakonaukio square',
          'Winter events: ice bar and light installations along the promenade',
        ],
      },
      features: [
        {
          icon: 'stage',
          title: 'Mainstage on the shore',
          description: 'The Nordics’ most cinematic lake view behind the artists — sunset becomes part of the show.',
        },
        {
          icon: 'rally',
          title: 'Secto Rally Finland Service Park',
          description: 'WRC teams set up at Paviljonki 30 Jul – 2 Aug 2026 — walk right up to the machines roaring through the city.',
        },
        {
          icon: 'stage',
          title: 'Tanssisali Lutakko',
          description: 'Finland’s most beloved underground gig venue, set in an early-1900s heritage industrial building right by Lutakonaukio square. Jelmu programmes rock, punk, metal and indie all year — jelmu.net.',
        },
        {
          icon: 'food',
          title: 'OlutSatama',
          description: 'Finland’s best beer event, 11–13 Jun 2026 on Lutakonaukio — 200+ breweries, food stalls and live gigs. 49,000+ visitors since 2016. olutsatama.fi',
        },
        {
          icon: 'food',
          title: 'Pop-up street food',
          description: 'During festivals the square fills with food trucks and craft breweries.',
        },
      ],
      cta: { label: 'Browse events', href: '#events' },
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
          'Container-ravintola Waves ja Trattoria Aukio Lutakonaukiolla',
          'HIISI-panimon taproom & bottleshop ja luonnonviinibaarit kortteleilla',
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
          title: 'Satamacafét',
          description: 'Avoimet terassit aamiaisesta brunssiin – paras kuppi kahvia veden äärellä.',
        },
        {
          icon: 'sauna',
          title: 'Julkinen rantasauna',
          description: 'Avantouintia talvella, palju ja pesäkivisauna ympäri vuoden – vain muutaman askeleen päässä Viilusta.',
        },
      ],
      cta: { label: 'Varaa pöytä', href: '#restaurants' },
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
          'Container restaurant Waves and Trattoria Aukio on Lutakonaukio',
          'HIISI Brewery taproom & bottleshop and natural-wine bars in the district',
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
          title: 'Harbour cafés',
          description: 'Open terraces from breakfast through brunch — the best coffee cup by the water.',
        },
        {
          icon: 'sauna',
          title: 'Public lakefront sauna',
          description: 'Ice swimming in winter, hot tub and wood sauna year-round — steps from Viilu.',
        },
      ],
      cta: { label: 'Reserve a table', href: '#restaurants' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* 3. Marina, Sports & Family Recreation                               */
  /* ------------------------------------------------------------------ */
  {
    id: 'marina-recreation',
    navLabel: { fi: 'Satama & Perhe', en: 'Marina & Family' },
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
      title: 'Vesi, valo, vapaa-aika',
      subtitle: 'Vierasvenesatama, urheilukentät ja perheen suosikkipaikat',
      description:
        'Lutakon Satama on yhtä aikaa vierasvenesatama, urheilukortteli ja perhepuisto — täältä lähdetään purjehtimaan Päijänteelle ja palataan piknikille auringonlaskuun.',
      tagline: 'Päivä veden äärellä, lapset mukana',
      section1: {
        title: 'Vierasvenesatama',
        subtitle:
          '46 vieraspaikkaa, sähkö, vesi, polttoaine ja saunapalvelut – Päijänteen pohjoisin matkustajasatama, Vuoden vierassatama 2017 -kunniamaininta.',
      },
      section2: {
        title: 'Urheilu ja liike',
        subtitle:
          'Beach volley -kentät, padelhalli, ulkokuntosali ja juoksureitit lähtevät suoraan rannasta.',
      },
      section3: {
        title: 'Lapset ja perheet',
        subtitle:
          'Leikkialueet, vesileikit ja piknikniityt — Lutakonaukion vesielementit ovat lasten suosikkeja kuumimpina päivinä.',
      },
      details: {
        title: 'Lutakon vapaa-ajan infra',
        desc: 'Suunniteltu niin että lapset, urheilijat ja veneilijät risteävät turvallisesti samalla rantapromenadilla.',
        bulletPoints: [
          'Vierasvenesatama: 46 paikkaa, sähkö, vesi, polttoaine ja saunaliittymä — Vuoden vierassatama 2017 -kunniamaininta',
          'Beach volley, padel, ulkokuntosali, kuntoporras ja Gr8 Wake -vesiurheilukeskus (wakeboard, SUP, vesipuisto)',
          'Lasten leikki- ja vesileikkialueet Lutakonaukiolla',
          'Piknikniityt sekä grillipaikat veden äärellä',
          'Jyväskylän Rantaraitti — 13 km esteetön rantareitti lähtee satamasta; Kuokkalan silta kaartuu yli järven',
        ],
      },
      features: [
        {
          icon: 'marina',
          title: 'Vierasvenesatama',
          description: '46 vieraspaikkaa Päijänteen pohjoisimmassa matkustajasatamassa — sähkö, vesi, polttoaine ja saunavuoroja, kävelymatkan päässä kaupungin keskustasta.',
        },
        {
          icon: 'sports',
          title: 'Beach volley & padel',
          description: 'Avoin pelivaraus rantakentille; padel-kupolit valaistu pikkutunneille saakka.',
        },
        {
          icon: 'kids',
          title: 'Lasten vesileikit',
          description: 'Suihkulähteet, leikkialue ja matala uimaranta — turvallinen päivä, vaikka aikuiset jäisivät terassille.',
        },
        {
          icon: 'picnic',
          title: 'Piknik & näköalaterassi',
          description: 'Suunniteltuja piknikniittyjä ja katettu näköalaterassi auringonlaskuun.',
        },
        {
          icon: 'viilu',
          title: 'Arkkitehtuurin polku',
          description: 'Satamassa pysyvä Alvar Aalto -venenäyttely; arkkitehtuurin reitti vie Aalto-museolle ja Saunaravintola Sataman Viilun puuarkkitehtuuriin.',
        },
      ],
      cta: { label: 'Suunnittele päivä', href: '#marina' },
    },
    en: {
      title: 'Water, light, leisure',
      subtitle: 'Yacht marina, sports facilities and family favourites',
      description:
        'Lutakon Satama is at once a guest marina, a sports district and a family park — set sail to Päijänne and return for a picnic at sunset.',
      tagline: 'A day by the water, with everyone',
      section1: {
        title: 'Yacht & guest marina',
        subtitle:
          '46 guest berths with shore power, water, fuel and sauna access — Päijänne’s northernmost passenger harbour and an honourable mention in the 2017 Guest Harbour of the Year vote.',
      },
      section2: {
        title: 'Sports & motion',
        subtitle:
          'Beach volleyball courts, a padel hall, outdoor gym and running trails launch straight from the shore.',
      },
      section3: {
        title: 'Kids & families',
        subtitle:
          'Playgrounds, splash zones and picnic meadows — Lutakonaukio’s water features become the kids’ favourite on hot days.',
      },
      details: {
        title: 'Lutakko leisure infrastructure',
        desc: 'Designed so that kids, athletes and sailors safely share the same waterfront promenade.',
        bulletPoints: [
          'Guest marina: 46 berths with shore power, water, fuel and sauna access — 2017 Guest Harbour of the Year honourable mention',
          'Beach volleyball, padel, outdoor gym, stairs run and Gr8 Wake water-sports centre (wakeboard, SUP, water park)',
          'Children’s play and water-play areas at Lutakonaukio',
          'Picnic meadows and grill spots by the water',
          'Jyväskylä Rantaraitti — the 13 km accessible lakeside trail starts at the marina; Kuokkala bridge arches across the lake',
        ],
      },
      features: [
        {
          icon: 'marina',
          title: 'Guest marina',
          description: '46 guest berths in Päijänne’s northernmost passenger harbour — shore power, water, fuel and sauna access, all within a short walk of downtown.',
        },
        {
          icon: 'sports',
          title: 'Beach volley & padel',
          description: 'Open booking on shoreline courts; padel domes lit into the small hours.',
        },
        {
          icon: 'kids',
          title: 'Kids’ splash zones',
          description: 'Fountains, playground and a shallow beach — a safe day even if the grown-ups stay on the terrace.',
        },
        {
          icon: 'picnic',
          title: 'Picnic & viewpoint',
          description: 'Designed picnic meadows and a sheltered observation terrace for the sunset.',
        },
        {
          icon: 'viilu',
          title: 'The architecture trail',
          description: 'A permanent Alvar Aalto-designed boat is displayed at the harbour, and the architecture route leads to the Aalto Museum and the timber pavilion of Sauna restaurant Sataman Viilu.',
        },
      ],
      cta: { label: 'Plan a day', href: '#marina' },
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
    location: 'Satamakatu 8, 40100 Jyväskylä · 014 569 5000',
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
    location: 'Satamakatu 8, 40100 Jyväskylä, Finland · +358 14 569 5000',
  },
} as const;
