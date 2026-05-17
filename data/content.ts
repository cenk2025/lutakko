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
        'SuomiPop heinäkuussa, Neste WRC elokuussa, viikoittaisia konsertteja Lutakko Liven lavalla — ja Saunaravintola Viilu vastapäätä järveä.',
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
        'SuomiPop in July, Neste WRC in August, weekly gigs at Lutakko Live — and Sauna restaurant Viilu just across the water.',
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
    tagline: 'Jyväskylän sydän järven rannalla',
    description:
      'Festivaaleja, ravintoloita, saunaa, satamaa ja perheaktiviteetteja — kaikki yhdessä paikassa Lutakon rantaraitilla.',
  },
  en: {
    name: 'Lutakon Satama',
    tagline: 'The beating heart of Jyväskylä on the lakeshore',
    description:
      'Festivals, restaurants, sauna, marina and family activities — all gathered along the Lutakko waterfront promenade.',
  },
} as const;

export const NAV_LINKS: Array<{ key: string; fi: string; en: string }> = [
  { key: 'festivals-culture', fi: 'Kulttuuri', en: 'Culture' },
  { key: 'food-sauna',        fi: 'Ruoka & Sauna', en: 'Dine & Sauna' },
  { key: 'marina-recreation', fi: 'Satama & Perhe', en: 'Marina & Family' },
];

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
        'SuomiPopin bassot kantautuvat veden yli, Neste Ralli täyttää korttelin moottoreiden hurinalla ja Lutakonaukio elää koko kesän — konsertit, kesäteatteri ja katukulttuuri kutsuvat pysähtymään.',
      tagline: 'Kesä, joka kuuluu kauas',
      section1: {
        title: 'SuomiPop kokoaa Suomen',
        subtitle:
          'Kolme päivää, kymmeniä artisteja, yksi rantanäkymä — Lutakko muuttuu Suomen suurimmaksi kesäsaliksi.',
      },
      section2: {
        title: 'Rallien sydämessä',
        subtitle:
          'Neste World Rally Finland tuo maailmanluokan moottoriurheilun ydinkeskustaan. Servicepark on kävelymatkan päässä satamasta.',
      },
      section3: {
        title: 'Lutakonaukio läpi vuoden',
        subtitle:
          'Aukio elää aamukahveista myöhäisiin DJ-iltoihin. Kausi vaihtuu, ohjelma ei lopu koskaan.',
      },
      details: {
        title: 'Kulttuurikevät ja -kesä Lutakossa',
        desc: 'Lutakko Live, Paviljonki ja avoimet aukiot — tapahtumakortteli rakennettiin musiikille ja yhteisille hetkille.',
        bulletPoints: [
          'SuomiPop Festival – heinäkuun toinen viikonloppu',
          'Neste World Rally Finland – elokuu, Servicepark Paviljongilla',
          'Lutakko Live -klubin keikkakalenteri ympäri vuoden',
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
          title: 'Rally Servicepark',
          description: 'WRC-tallit Paviljongin pihalla – pääset lähelle koneita, joiden ääni täyttää koko kaupungin.',
        },
        {
          icon: 'stage',
          title: 'Klubi-illat',
          description: 'Tanssilattialla Lutakko Live ja Ilokivi vaihtelevat soundeja indiestä elektroniseen.',
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
        'SuomiPop’s bass rolls across the lake, Neste Rally Finland fills the block with engine roar, and Lutakonaukio square breathes culture all summer long — concerts, theatre and street life invite you to stop.',
      tagline: 'A summer that travels far',
      section1: {
        title: 'SuomiPop gathers Finland',
        subtitle:
          'Three days, dozens of artists, one lakefront view — Lutakko becomes Finland’s largest open-air living room.',
      },
      section2: {
        title: 'At the heart of the rally',
        subtitle:
          'Neste World Rally Finland brings world-class motorsport into the city centre. The service park is a short walk from the marina.',
      },
      section3: {
        title: 'Lutakonaukio year round',
        subtitle:
          'From early morning coffees to late-night DJ sets, the square never really sleeps — the programme just changes seasons.',
      },
      details: {
        title: 'Spring & summer culture in Lutakko',
        desc: 'Lutakko Live, Paviljonki and open squares — this district was built for music and gatherings.',
        bulletPoints: [
          'SuomiPop Festival — second weekend of July',
          'Neste World Rally Finland — August, Service Park at Paviljonki',
          'Lutakko Live club nights year-round',
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
          title: 'Rally Service Park',
          description: 'WRC teams set up at Paviljonki — you can walk right up to the machines roaring through the city.',
        },
        {
          icon: 'stage',
          title: 'Club nights',
          description: 'Lutakko Live and Ilokivi flip between indie, punk and electronic, every weekend of the year.',
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
          fi: 'Saunaravintola Viilu järven rannalla',
          en: 'Sauna restaurant Viilu by the lake',
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
          src: '/images/featured/food-sauna/gallery-3.jpg',
          alt: { fi: 'Rantaterassi aurinkoisena päivänä', en: 'Lakefront café terrace on a sunny day' },
        },
      ],
    },
    fi: {
      title: 'Maku ja löyly',
      subtitle: 'Saunaravintola Viilu, satamacafét ja iltaelämä',
      description:
        'Päivä alkaa kahvikupin ja höyryävän rantanäkymän äärellä, ja päättyy löylyihin sekä lähiruokaan Viilussa — Lutakon makumaailma on yhtä paljon arkkitehtuuria kuin gastronomiaa.',
      tagline: 'Pohjoismainen makumatka veden äärellä',
      section1: {
        title: 'Saunaravintola Viilu',
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
          'Ilokivi, Lutakko Live, terassit ja kelluvat baarit — sataman illat kantavat aamuun pyöräilijöiden ohitse.',
      },
      details: {
        title: 'Lutakon gastronominen reitti',
        desc: 'Yhdellä kävelyllä reitti vie pop-up-bistroista savusaunaan ja iltabaariin – tämä on kortteli, jota tehdään hitaasti.',
        bulletPoints: [
          'Saunaravintola Viilu – Alvar Aalto -museon naapurissa',
          'Ravintolalaiva Gaia – kelluva à la carte järven ulapalla',
          'Erikoiskahvilat ja konditoria rantapromenadilla',
          'Pienpanimoiden taproomit ja luonnonviinibaarit',
          'Kauden makujen menut: kalaa Päijänteestä, sieniä lähimetsistä',
        ],
      },
      features: [
        {
          icon: 'sauna',
          title: 'Saunaravintola Viilu',
          description: 'Saaristolaisen makuinen menu ja jatkuvat löylyt — varaa pöytä auringonlaskuun.',
        },
        {
          icon: 'food',
          title: 'Ravintolalaiva Gaia',
          description: 'Historiallinen sisävesilaiva, jossa illallinen liikkuu ulapalle ja takaisin satamaan.',
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
      subtitle: 'Sauna restaurant Viilu, harbour cafés and nightlife',
      description:
        'Mornings start with espresso and a steamy lake view, evenings end with sauna heat and locally sourced dishes at Viilu — Lutakko’s flavours are as much architecture as gastronomy.',
      tagline: 'A Nordic flavour journey by the water',
      section1: {
        title: 'Sauna restaurant Viilu',
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
          'Ilokivi, Lutakko Live, terraces and floating bars — harbour evenings stretch until dawn cyclists pass by.',
      },
      details: {
        title: 'The gastronomic route through Lutakko',
        desc: 'One walk takes you from pop-up bistros to smoke-sauna to a late-night bar – this is a district built to be lingered in.',
        bulletPoints: [
          'Sauna restaurant Viilu — neighbour to the Alvar Aalto museum',
          'Restaurant ship Gaia — floating à la carte out on the open lake',
          'Specialty cafés and bakeries along the promenade',
          'Microbrewery taprooms and natural-wine bars',
          'Seasonal menus: Päijänne fish, foraged mushrooms',
        ],
      },
      features: [
        {
          icon: 'sauna',
          title: 'Sauna restaurant Viilu',
          description: 'An archipelago-inspired menu and continuous löyly — book a table to catch the sunset.',
        },
        {
          icon: 'food',
          title: 'Restaurant ship Gaia',
          description: 'Historic inland steamer where dinner sails out onto the lake and returns to the marina.',
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
          'Yli 60 vieraspaikkaa, sähkö, vesi ja saunapalvelut – Päijänteen sisäsataman moderneimpia.',
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
          'Vierasvenesatama: 60+ paikkaa, polttoaine, saunaliittymä',
          'Beach volley, padel, ulkokuntosali ja kuntoporras',
          'Lasten leikki- ja vesileikkialueet Lutakonaukiolla',
          'Piknikniityt sekä grillipaikat veden äärellä',
          'Näköalaterassi ja rantapromenadi pyörätuolikuntoinen',
        ],
      },
      features: [
        {
          icon: 'marina',
          title: 'Vierasvenesatama',
          description: 'Päijänteen modernein sisäsatama — sähkö, vesi, saunavuoroja ja kävelymatka kaupungin keskustaan.',
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
          description: 'Alvar Aalto -museon ja Viilun puuarkkitehtuurin reitti kulkee suoraan satamasta.',
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
          'Over 60 guest berths with shore power, water and sauna access — one of Päijänne’s most modern inland harbours.',
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
          'Guest marina: 60+ berths, fuel, sauna access',
          'Beach volleyball, padel, outdoor gym and stairs run',
          'Children’s play and water-play areas at Lutakonaukio',
          'Picnic meadows and grill spots by the water',
          'Observation terrace and wheelchair-accessible promenade',
        ],
      },
      features: [
        {
          icon: 'marina',
          title: 'Guest marina',
          description: 'Päijänne’s most modern inland harbour — shore power, water, sauna slots, walking distance to downtown.',
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
          description: 'The Alvar Aalto Museum and Viilu timber pavilion are linked by a route that starts at the marina.',
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
    location: 'Jyväskylä, Suomi',
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
    location: 'Jyväskylä, Finland',
  },
} as const;
