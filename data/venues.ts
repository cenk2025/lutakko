import type { Lang } from './content';

export type VenueKind = 'venue' | 'event';

export interface VenueFact {
  fi: { label: string; value: string };
  en: { label: string; value: string };
}

export interface VenueCopy {
  hero: { eyebrow: string; title: string; subtitle: string };
  about: string;
  highlights: string[];
  /** Optional sales pitch copy for the "claim this listing" form. */
  pitch: string;
}

export interface VenueEntry {
  slug: string;
  kind: VenueKind;
  category: 'festivals-culture' | 'food-sauna' | 'marina-recreation' | 'business';
  themeColor: string;
  themeRgb: [number, number, number];
  /** Optional hero image path under /public/ */
  image: string | null;
  url: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  facts: VenueFact[];
  fi: VenueCopy;
  en: VenueCopy;
}

export const VENUES: VenueEntry[] = [
  /* ====================================================================== */
  /*  EVENTS                                                                */
  /* ====================================================================== */
  {
    slug: 'olutsatama',
    kind: 'event',
    category: 'festivals-culture',
    themeColor: '#fbbf24',
    themeRgb: [251, 191, 36],
    image: null,
    url: 'https://www.olutsatama.fi/',
    email: null,
    phone: null,
    address: 'Lutakonaukio, Jyväskylä',
    facts: [
      { fi: { label: 'Päivämäärät', value: '11.–13.6.2026' }, en: { label: 'Dates', value: '11–13 Jun 2026' } },
      { fi: { label: 'Sijainti', value: 'Lutakonaukio, Satamakatu 3' }, en: { label: 'Location', value: 'Lutakonaukio square, Satamakatu 3' } },
      { fi: { label: 'Panimot', value: '200+ panimoa, 49 000+ kävijää (2016–2025)' }, en: { label: 'Breweries', value: '200+ breweries, 49,000+ visitors since 2016' } },
      { fi: { label: 'Sisäänkäynti', value: 'Lutakonaukion puolelta, Sokos Hotel Paviljongin vieressä' }, en: { label: 'Entrance', value: 'Lutakonaukio side, next to Sokos Hotel Paviljonki' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Tapahtuma · Kesäkuu',
        title: 'OlutSatama 2026',
        subtitle: '"Suomen paras olut-tapahtuma" 11.–13.6.2026 Lutakonaukiolla.',
      },
      about:
        'OlutSatama on Jyväskylän kesän odotetuin olut- ja ruokatapahtuma. Yli 200 panimon kattaus kerääntyy Lutakonaukiolle, ja kolme festivaalipäivää sisältävät myös ruokapisteitä sekä lavaohjelmaa. Tapahtuma järjestetään 2026 jo kymmenettä kertaa.',
      highlights: [
        'Torstai 11.6. 17–23, perjantai 12.6. 15–02, lauantai 13.6. 14–02',
        '200+ panimoa, ruokapisteet, lavaohjelma',
        '49 000+ kävijää vuodesta 2016',
        'Liput: coregoshop.fi/olutsatama-2026-1',
        'Yhteistyökumppanit: Aito Elämys, Teerenpeli, Harvestian, Maukka, WorkPower',
      ],
      pitch:
        'OlutSatama tavoittaa kymmenet tuhannet kävijät kesän huippuviikonloppuna. Brändi- ja sponsorinäkyvyydestä voi neuvotella suoraan tapahtumasivun kautta.',
    },
    en: {
      hero: {
        eyebrow: 'Event · June',
        title: 'OlutSatama 2026',
        subtitle: '“Finland’s best beer event” 11–13 June 2026 on Lutakonaukio square.',
      },
      about:
        'OlutSatama is Jyväskylä’s most anticipated summer beer-and-food festival. Over 200 breweries take over Lutakonaukio, and the three-day programme adds food vendors and live stage acts. 2026 is the tenth edition.',
      highlights: [
        'Thu 11 Jun 17:00–23:00, Fri 12 Jun 15:00–02:00, Sat 13 Jun 14:00–02:00',
        '200+ breweries, food stalls, on-stage programme',
        '49,000+ visitors since 2016',
        'Tickets: coregoshop.fi/olutsatama-2026-1',
        'Partners: Aito Elämys, Teerenpeli, Harvestian, Maukka, WorkPower',
      ],
      pitch:
        'OlutSatama reaches tens of thousands of visitors during the peak summer weekend. Brand and sponsor visibility can be negotiated directly via this page.',
    },
  },

  {
    slug: 'suomipop',
    kind: 'event',
    category: 'festivals-culture',
    themeColor: '#fb7185',
    themeRgb: [251, 113, 133],
    image: null,
    url: 'https://suomipopfestivaali.fi/jyvaskyla/',
    email: null,
    phone: null,
    address: 'Lutakko, Jyväskylä',
    facts: [
      { fi: { label: 'Päivämäärät', value: '9.–11.7.2026' }, en: { label: 'Dates', value: '9–11 Jul 2026' } },
      { fi: { label: 'Liput', value: 'suomipopfestivaali.fi/jyvaskyla/liput' }, en: { label: 'Tickets', value: 'suomipopfestivaali.fi/jyvaskyla/liput' } },
      { fi: { label: 'Sijainti', value: 'Lutakon rantakortteli' }, en: { label: 'Location', value: 'Lutakko waterfront block' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Tapahtuma · Heinäkuu',
        title: 'SuomiPop Festival 2026',
        subtitle: 'Kolme päivää, kymmeniä artisteja, yksi rantanäkymä — Lutakko muuttuu Suomen suurimmaksi kesäsaliksi.',
      },
      about:
        'SuomiPop Festival on yksi Suomen suurimmista kotimaisen popin festivaaleista. Heinäkuun toinen viikonloppu kokoaa Lutakon rantaan kymmenet artistit ja kymmenettuhannet kävijät — kaupungin keskusta kuuluu festivaalille kolmen päivän ajan.',
      highlights: [
        '9.–11.7.2026 Jyväskylässä',
        'Liput: suomipopfestivaali.fi/jyvaskyla/liput',
        'Päälava rannalla — Pohjoismaiden komein järvinäkymä esiintyjien takana',
        'Aukion ympärillä street food + pop-up-baareja',
        'Hotellit Lutakon kortteleissa: Solo Sokos Paviljonki, Original Sokos Alexandra',
      ],
      pitch:
        'SuomiPop on Jyväskylän kesän näkyvin tapahtuma. Brändinäkyvyys festivaalisivulla — bännerit, mainospaikat, ja tapahtumakohtaiset paketit.',
    },
    en: {
      hero: {
        eyebrow: 'Event · July',
        title: 'SuomiPop Festival 2026',
        subtitle: 'Three days, dozens of artists, one lakefront view — Lutakko becomes Finland’s biggest open-air living room.',
      },
      about:
        'SuomiPop is one of Finland’s biggest Finnish-pop festivals. The second weekend of July gathers dozens of artists and tens of thousands of visitors to Lutakko — the city centre belongs to the festival for three days.',
      highlights: [
        '9–11 Jul 2026 in Jyväskylä',
        'Tickets: suomipopfestivaali.fi/jyvaskyla/liput',
        'Lakefront mainstage with the Nordics’ most cinematic backdrop',
        'Street food + pop-up bars around the square',
        'Hotels in the Lutakko block: Solo Sokos Paviljonki, Original Sokos Alexandra',
      ],
      pitch:
        'SuomiPop is the most visible event of Jyväskylä’s summer. On-page brand visibility — banners, ad slots, event-specific sponsor packages.',
    },
  },

  {
    slug: 'secto-rally',
    kind: 'event',
    category: 'festivals-culture',
    themeColor: '#a78bfa',
    themeRgb: [167, 139, 250],
    image: null,
    url: 'https://sectorallyfinland.fi/',
    email: null,
    phone: null,
    address: 'Servicepark · Paviljonki, Lutakonaukio 1, Jyväskylä',
    facts: [
      { fi: { label: 'Päivämäärät', value: '30.7.–2.8.2026' }, en: { label: 'Dates', value: '30 Jul – 2 Aug 2026' } },
      { fi: { label: 'Servicepark', value: 'Paviljonki, Lutakonaukio' }, en: { label: 'Service Park', value: 'Paviljonki, Lutakonaukio' } },
      { fi: { label: 'Sarja', value: 'WRC — FIA World Rally Championship' }, en: { label: 'Series', value: 'WRC — FIA World Rally Championship' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Tapahtuma · Elo',
        title: 'Secto Rally Finland 2026',
        subtitle: 'Maailmanmestaruus-rallin yksi legendaarisin osakilpailu — Servicepark muutaman askeleen päässä satamasta.',
      },
      about:
        'Secto Rally Finland on Suomen suurin yleisötapahtuma ja yksi WRC-sarjan klassisimmista osakilpailuista. Vuonna 2026 ralli järjestetään 30.7.–2.8., ja Servicepark sijoittuu jälleen Paviljongille, kävelymatkan päähän Lutakon satamasta.',
      highlights: [
        '30.7.–2.8.2026 Jyväskylässä',
        'Servicepark Paviljongin pihalla — WRC-tallit lähellä',
        'WRC-sarjan klassikko — kymmeniä tuhansia kansainvälisiä kävijöitä',
        'Lutakon ravintolat, sauna ja sataman terassit ovat ralliyleisön ydinkortteli',
        'Lipunmyynti ja ohjelma: sectorallyfinland.fi',
      ],
      pitch:
        'Ralli on satama-alueen näkyvin elokuun tapahtuma. Sponsorit ja näkyvyyspaketit voivat tavoittaa ralliviikonlopun aikana yli 100 000 kävijää.',
    },
    en: {
      hero: {
        eyebrow: 'Event · Aug',
        title: 'Secto Rally Finland 2026',
        subtitle: 'One of the most legendary rounds of the World Rally Championship — Service Park steps from the harbour.',
      },
      about:
        'Secto Rally Finland is Finland’s biggest public sporting event and one of the most iconic rounds of the WRC season. In 2026 it runs 30 July – 2 August, with the Service Park again at Paviljonki, a short walk from Lutakon Satama.',
      highlights: [
        '30 Jul – 2 Aug 2026 in Jyväskylä',
        'Service Park at Paviljonki — WRC garages within walking distance',
        'WRC classic — tens of thousands of international visitors',
        'Lutakko restaurants, saunas and harbour terraces are the rally crowd’s home block',
        'Tickets & programme: sectorallyfinland.fi',
      ],
      pitch:
        'The rally is the harbour district’s most visible August event. Sponsor packages can reach 100,000+ visitors over the rally weekend.',
    },
  },

  /* ====================================================================== */
  /*  VENUES — FOOD & SAUNA                                                 */
  /* ====================================================================== */
  {
    slug: 'viilu',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    image: '/images/featured/food-sauna/hero.jpg',
    url: 'https://satamanviilu.fi/',
    email: null,
    phone: null,
    address: 'Lutakon satama, Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Saunaravintola' }, en: { label: 'Type', value: 'Sauna restaurant' } },
      { fi: { label: 'Sijainti', value: 'Lutakon satama, Alvar Aalto -museon naapurissa' }, en: { label: 'Location', value: 'Lutakon Satama, next to the Alvar Aalto Museum' } },
      { fi: { label: 'Erikoisuus', value: 'Puuarkkitehtuuri, 270° järvinäköala' }, en: { label: 'Highlight', value: 'Timber pavilion, 270° lake view' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Ravintola · Sauna',
        title: 'Saunaravintola Sataman Viilu',
        subtitle: 'Veden ylle kelluva puuarkkitehtuuri — sauna on osa illallista.',
      },
      about:
        'Sataman Viilu on Lutakon satamassa toimiva saunaravintola, jonka puinen paviljonki kohoaa veden ylle Alvar Aalto -museon naapurissa. Saunaravintolassa yhdistyvät pohjoismainen makumaailma, 270° järvinäköala ja jatkuvat löylyt.',
      highlights: [
        'Saaristolaisen makuinen menu, illallinen järven äärellä',
        'Yksityiset löylyt ja sauna-ravintolapaketit',
        'Suunniteltu osaksi Lutakon arkkitehtuuripolkua',
        'Varaukset & menu: satamanviilu.fi',
      ],
      pitch:
        'Sataman Viilu on yksi sataman keskeisistä brändeistä. Listaa ravintolasi etusivulla, lisää oman sivun, ja kaappaa varauksia suoraan dashboardin kautta.',
    },
    en: {
      hero: {
        eyebrow: 'Restaurant · Sauna',
        title: 'Saunaravintola Sataman Viilu',
        subtitle: 'A timber pavilion hovering above the lake — sauna is part of dinner.',
      },
      about:
        'Sataman Viilu is the harbour’s sauna restaurant, a wooden pavilion that hovers over the lake right next to the Alvar Aalto Museum. The venue combines Nordic flavours, a 270° lake view and continuous löyly.',
      highlights: [
        'Archipelago-inspired menu, dinner by the lake',
        'Private löyly and sauna-dinner packages',
        'Part of Lutakko’s architecture trail',
        'Reservations & menu: satamanviilu.fi',
      ],
      pitch:
        'Sataman Viilu is one of the harbour’s signature brands. List on the homepage, claim a dedicated page, and capture bookings via the dashboard.',
    },
  },

  {
    slug: 'tanssisali-lutakko',
    kind: 'venue',
    category: 'festivals-culture',
    themeColor: '#fb7185',
    themeRgb: [251, 113, 133],
    image: null,
    url: 'https://www.jelmu.net/',
    email: null,
    phone: null,
    address: 'Schaumanin puistotie 3, Lutakko, Jyväskylä',
    facts: [
      { fi: { label: 'Operaattori', value: 'Jyväskylän Elävän Musiikin Yhdistys (Jelmu ry)' }, en: { label: 'Operator', value: 'Jyväskylän Elävän Musiikin Yhdistys (Jelmu ry)' } },
      { fi: { label: 'Tyyppi', value: 'Rock-klubi vanhassa teollisuusrakennuksessa' }, en: { label: 'Type', value: 'Rock club in a heritage industrial building' } },
      { fi: { label: 'Ohjelmisto', value: 'Rock, punk, metalli, indie ympäri vuoden' }, en: { label: 'Programme', value: 'Rock, punk, metal, indie all year' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Klubi · Konsertit',
        title: 'Tanssisali Lutakko',
        subtitle: 'Suomen rakastetuin underground-konserttipaikka 1900-luvun alun teollisuusrakennuksessa.',
      },
      about:
        'Tanssisali Lutakko on Jelmu ry:n ylläpitämä legendaarinen rock-klubi Lutakonaukion laidalla. Vanhassa teollisuusrakennuksessa toimiva klubi on isännöinyt vuosikymmenten ajan kotimaisia ja kansainvälisiä rock-, punk-, metalli- ja indiekonsertteja.',
      highlights: [
        'Kuukausittain useita keikkoja — ohjelmistossa indiestä metallin perusteisiin',
        'Vanhassa teollisuusrakennuksessa Lutakonaukion vieressä',
        'Jelmu ry:n vapaaehtoiset pitävät kulttuurin elossa',
        'Ohjelma: jelmu.net',
      ],
      pitch:
        'Jelmu/Lutakko on Jyväskylän kulttuurihistorian ydintä. Sponsorinäkyvyys tukee konserttisarjaa ja toistuu kaikkien tapahtumien yhteydessä.',
    },
    en: {
      hero: {
        eyebrow: 'Club · Gigs',
        title: 'Tanssisali Lutakko',
        subtitle: 'Finland’s most beloved underground gig venue, set in an early-1900s industrial building.',
      },
      about:
        'Tanssisali Lutakko, run by Jelmu ry, is the legendary rock club right beside Lutakonaukio. Housed in a heritage industrial building, it has hosted Finnish and international rock, punk, metal and indie acts for decades.',
      highlights: [
        'Multiple gigs every month — indie to metal cornerstones',
        'Inside a turn-of-the-century industrial building beside Lutakonaukio',
        'Run by Jelmu ry volunteers keeping culture alive',
        'Programme: jelmu.net',
      ],
      pitch:
        'Jelmu/Lutakko is at the core of Jyväskylä’s cultural history. Sponsorship visibility supports the concert series and recurs across every show.',
    },
  },

  {
    slug: 'gaia',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    image: '/images/featured/food-sauna/gallery-2.jpg',
    url: null,
    email: null,
    phone: null,
    address: 'Lutakon satama, Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Historiallinen ravintolalaiva' }, en: { label: 'Type', value: 'Historic restaurant ship' } },
      { fi: { label: 'Sijainti', value: 'Lutakon vierasvenesatama' }, en: { label: 'Location', value: 'Lutakko guest marina' } },
      { fi: { label: 'Erikoisuus', value: 'Sisävesilaiva, à la carte ulapalla' }, en: { label: 'Highlight', value: 'Inland steamer, à la carte on the open lake' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Ravintolalaiva',
        title: 'Ravintolalaiva Gaia',
        subtitle: 'Historiallinen sisävesilaiva, jossa illallinen liikkuu ulapalle ja takaisin satamaan.',
      },
      about:
        'Ravintolalaiva Gaia on Lutakon satamassa kiinnittynyt historiallinen sisävesilaiva, joka tarjoaa à la carte -illallisia järvellä. Illalliskävely yhdistyy Päijänteen panoraamaan ja kelluvaan kannenpäälliseen terassiin.',
      highlights: [
        'À la carte illalliset järven ulapalla',
        'Kelluva terassikansi',
        'Historiallinen sisävesilaivan rakennelma',
        'Soveltuu yksityistilaisuuksiin ja häihin',
      ],
      pitch:
        'Lutakon satamassa kiinnittynyt Gaia tavoittaa kymmeniä tuhansia kävijöitä. Listaa ravintolan oma sivu, lisää menut ja varauspyynnöt.',
    },
    en: {
      hero: {
        eyebrow: 'Restaurant ship',
        title: 'Restaurant ship Gaia',
        subtitle: 'A historic inland steamer where dinner sails onto the open lake and back to the marina.',
      },
      about:
        'Gaia is a historic inland steamer moored in Lutakon Satama, serving à la carte dinners on the lake. The cruise dinner pairs Päijänne panoramas with a floating top-deck terrace.',
      highlights: [
        'À la carte dinners on the open lake',
        'Floating top-deck terrace',
        'Historic inland steamer hull',
        'Available for private events and weddings',
      ],
      pitch:
        'Moored in Lutakon Satama, Gaia is seen by tens of thousands of visitors. Claim a venue page, publish menus and capture booking enquiries.',
    },
  },

  {
    slug: 'musta-magia',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    image: null,
    url: 'https://mustamagia.fi/',
    email: 'info@mustamagia.fi',
    phone: '040 189 0801',
    address: 'Lutakon satama, Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Ravintolalaiva (Limanda)' }, en: { label: 'Type', value: 'Restaurant ship (Limanda)' } },
      { fi: { label: 'Kapasiteetti', value: '200 hengen ravintolalaiva + terassikansi' }, en: { label: 'Capacity', value: '200-seat ship + terrace deck' } },
      { fi: { label: 'Iltaohjelma', value: 'Karaoke pe–la (Mikon Karaoke), livemusiikki sunnuntaisin' }, en: { label: 'Evenings', value: 'Karaoke Fri–Sat (Mikon Karaoke), live music Sundays' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Ravintolalaiva',
        title: 'M/S Musta Magia',
        subtitle: '"Tervetuloa nauttimaan laivan antimista!" Limanda-ravintolalaiva 200 hengelle.',
      },
      about:
        'M/S Musta Magia on Lutakon satamassa toimiva 200-paikkainen ravintolalaiva, jossa toimii Limanda-ravintola. Karaokeillat perjantaisin ja lauantaisin sekä sunnuntain livemusiikki tekevät laivasta yhden Lutakon vilkkaimmista iltapaikoista. Toukokuun aukioloajat: ma–to 14–22, pe 14–01, la 12–01, su 12–22.',
      highlights: [
        '200-paikkainen ravintolalaiva',
        'Karaoke pe–la (Mikon Karaoke 21:00–00:30)',
        'Livemusiikki sunnuntaisin 19:00–21:00',
        'Tilattavissa yksityistilaisuuksiin (häät, syntymäpäivät, yritystilaisuudet)',
        'mustamagia.fi · 040 189 0801',
      ],
      pitch:
        'Musta Magia on luonnollinen sponsorimainoskumppani Lutakon iltatapahtumissa. Brändinäkyvyys laivan sivulla ja jaetuissa kampanjoissa.',
    },
    en: {
      hero: {
        eyebrow: 'Restaurant ship',
        title: 'M/S Musta Magia',
        subtitle: '“Welcome to enjoy the ship’s offerings!” The Limanda restaurant ship for 200.',
      },
      about:
        'M/S Musta Magia is a 200-seat restaurant ship at Lutakon Satama hosting the Limanda restaurant. Karaoke on Friday & Saturday nights plus Sunday live music make it one of Lutakko’s busiest evening venues. May hours: Mon–Thu 14:00–22:00, Fri 14:00–01:00, Sat 12:00–01:00, Sun 12:00–22:00.',
      highlights: [
        '200-seat restaurant ship',
        'Karaoke Fri & Sat (Mikon Karaoke 21:00–00:30)',
        'Live music Sundays 19:00–21:00',
        'Available for private events (weddings, birthdays, corporate)',
        'mustamagia.fi · 040 189 0801',
      ],
      pitch:
        'Musta Magia is a natural sponsor-ad partner for Lutakko evening events. Brand visibility on the ship’s page and shared campaigns.',
    },
  },

  {
    slug: 'morton',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    image: null,
    url: 'https://morton.fi/konttiravintola/jyvaskyla/',
    email: null,
    phone: '0400 416 372',
    address: 'Satamakatu 2, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Konttiravintola + kahvila' }, en: { label: 'Type', value: 'Container restaurant + café' } },
      { fi: { label: 'Tagline', value: '"Se alkuperäinen Konttiravintola"' }, en: { label: 'Tagline', value: '“The original container restaurant”' } },
      { fi: { label: 'Kausi', value: 'Avoinna kesäkaudella' }, en: { label: 'Season', value: 'Open through the summer season' } },
      { fi: { label: 'Toimitukset', value: 'Wolt' }, en: { label: 'Delivery', value: 'Wolt' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Ravintola · Konttiravintola',
        title: 'Konttiravintola Morton',
        subtitle: '"Se alkuperäinen Konttiravintola" Lutakon satamassa, Satamakatu 2:ssa.',
      },
      about:
        'Konttiravintola Morton on Lutakon sataman vilkkaimpia kesäravintoloita. Konttiarkkitehtuuri, kahvila ja avoin terassi tekevät paikasta sataman keskeisen kohtaamispaikan kesäaikaan. Wolt-toimitukset tuovat ravintolan myös koteihin.',
      highlights: [
        'Konttiarkkitehtuurinen ravintola + kahvila',
        'Avoinna kesäkaudella',
        'Wolt-toimitukset',
        'Soveltuu ryhmävarauksiin',
        'morton.fi · 0400 416 372',
      ],
      pitch:
        'Konttiravintola Morton tavoittaa kesäkauden vilkkaimmat kävijävirrat. Sponsoroitu kortti ravintolakategoriassa + dedikoitu venue-sivu.',
    },
    en: {
      hero: {
        eyebrow: 'Restaurant · Container',
        title: 'Konttiravintola Morton',
        subtitle: '“The original container restaurant” at Lutakon Satama, Satamakatu 2.',
      },
      about:
        'Konttiravintola Morton is one of Lutakon Satama’s busiest summer restaurants. The container architecture, café and open terrace make it a central meeting point at the harbour. Wolt brings the menu to your home.',
      highlights: [
        'Container-architecture restaurant + café',
        'Open through the summer season',
        'Wolt delivery',
        'Group bookings available',
        'morton.fi · 0400 416 372',
      ],
      pitch:
        'Morton catches the densest summer foot-traffic at the harbour. Sponsored card in the food category + dedicated venue page.',
    },
  },

  {
    slug: 'sataman-kahvila',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    image: '/images/featured/food-sauna/sataman-kahvila.jpg',
    url: 'https://msrhea.fi/jyvaskylan-sataman-kahvila/',
    email: 'myynti@msrhea.fi',
    phone: '0400 706 691',
    address: 'Lutakon vieraslaituri, Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Kahvila vuonna 1919 rakennetussa puurakennuksessa' }, en: { label: 'Type', value: 'Café in a timber building from 1919' } },
      { fi: { label: 'Operaattori', value: 'MatkaRhea' }, en: { label: 'Operator', value: 'MatkaRhea' } },
      { fi: { label: 'Aukiolo', value: 'Joka päivä 10–20, alkaen huhtikuusta' }, en: { label: 'Hours', value: 'Daily 10:00–20:00 from April' } },
      { fi: { label: 'Vieraspaikat', value: '17 € / vrk; max 4 h ilman lupaa' }, en: { label: 'Guest mooring', value: '€17 / day; max 4 h without permission' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Kahvila · 1919',
        title: 'Jyväskylän Sataman Kahvila',
        subtitle: '"Tervetuloa viihtymään." MatkaRhean kahvila vieraslaiturin vieressä Sataman Viilun naapurissa.',
      },
      about:
        'Vuonna 1919 rakennetussa keltaisessa puurakennuksessa toimiva kahvila on yksi sataman vanhimmista rakennuksista. MatkaRhean ylläpitämä kahvila tarjoaa tuoreita leivonnaisia, jäätelöä ja ranta-anniskelua joka päivä huhtikuun alusta.',
      highlights: [
        'Vuoden 1919 puurakennus vieraslaiturin vieressä',
        'Tuoreet leivonnaiset, jäätelö, A-oikeudet',
        'Avoinna joka päivä klo 10–20 huhtikuusta alkaen',
        'Vieraspaikat 17 € / vrk (max 4 h ilman lupaa)',
        'msrhea.fi/jyvaskylan-sataman-kahvila',
      ],
      pitch:
        'Sataman Kahvila on tunnistettava maamerkki Lutakossa. Dedikoitu venue-sivu, sponsoroitu kortti ja MatkaRhean risteilyjen ristiinmainonta.',
    },
    en: {
      hero: {
        eyebrow: 'Café · 1919',
        title: 'Jyväskylä Harbour Café (Sataman Kahvila)',
        subtitle: '“Welcome to enjoy yourself.” MatkaRhea’s café right by the guest dock, next to Sataman Viilu.',
      },
      about:
        'Set in a 1919 yellow timber building — one of the oldest at the harbour — Sataman Kahvila is run by MatkaRhea and serves fresh pastries, ice cream and licensed drinks daily from April onwards.',
      highlights: [
        '1919 timber building right by the guest dock',
        'Fresh pastries, ice cream, full A-licence',
        'Open daily 10:00–20:00 from April',
        'Guest mooring €17 / day (max 4 h without permission)',
        'msrhea.fi/jyvaskylan-sataman-kahvila',
      ],
      pitch:
        'Sataman Kahvila is a recognisable landmark in Lutakko. Dedicated venue page, sponsored card and cross-promotion with MatkaRhea cruises.',
    },
  },
];

/* ====================================================================== */
/*  STUBS — content to follow                                              */
/* ====================================================================== */

VENUES.push(
  {
    slug: 'saunalautta',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#fbbf24',
    themeRgb: [251, 191, 36],
    image: null,
    url: null,
    email: null,
    phone: null,
    address: 'Lutakon satama, Jyväskylä',
    facts: [],
    fi: {
      hero: {
        eyebrow: 'Saunalautat',
        title: 'Saunalautat Lutakon satamassa',
        subtitle: 'Lutakon sataman saunalauttojen varauskeskus — sisältö täydentyy pian.',
      },
      about: 'Sisältö lisätään pian. Tavoitteena on koota kaikkien Lutakon saunalauttayrittäjien varauskalenterit saman katon alle.',
      highlights: ['Sisältö täydentyy pian'],
      pitch:
        'Saunalauttojen varausalusta — Lutakossa toimii useita saunalauttayrittäjiä. Etsimme ensimmäisiä kumppaneita pilottiin.',
    },
    en: {
      hero: {
        eyebrow: 'Sauna rafts',
        title: 'Sauna rafts at Lutakon Satama',
        subtitle: 'Booking hub for Lutakko’s sauna rafts — content coming soon.',
      },
      about: 'Content to follow. The goal is to gather every Lutakko sauna-raft operator’s booking calendar under one roof.',
      highlights: ['Content coming soon'],
      pitch:
        'Sauna-raft booking platform — Lutakko hosts several sauna-raft operators. We are signing up first pilot partners.',
    },
  },
  {
    slug: 'trattoria-aukio',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    image: null,
    url: null,
    email: null,
    phone: null,
    address: 'Lutakonaukio, Jyväskylä',
    facts: [],
    fi: {
      hero: {
        eyebrow: 'Italialainen ravintola',
        title: 'Trattoria Aukio',
        subtitle: 'Lutakonaukion italialainen klassikko — sisältö täydentyy pian.',
      },
      about: 'Sisältö lisätään pian.',
      highlights: ['Sisältö täydentyy pian'],
      pitch:
        'Trattoria Aukio — listaa ravintolasi etusivulle, lisää menut ja varauspyynnöt suoraan.',
    },
    en: {
      hero: {
        eyebrow: 'Italian restaurant',
        title: 'Trattoria Aukio',
        subtitle: 'Lutakonaukio’s Italian classic — content coming soon.',
      },
      about: 'Content to follow.',
      highlights: ['Content coming soon'],
      pitch:
        'Trattoria Aukio — list on the homepage, add menus and capture booking enquiries.',
    },
  },
  {
    slug: 'hiisi',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#a3e635',
    themeRgb: [163, 230, 53],
    image: null,
    url: 'https://hiisi.beer/en/taproom/',
    email: 'taproom@hiisi.beer',
    phone: '+358 50 339 9416',
    address: 'Lutakonaukio 3, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Taproom & bottleshop · ravintola ja baari' }, en: { label: 'Type', value: 'Taproom & bottleshop · restaurant and bar' } },
      { fi: { label: 'Lounas', value: 'Ma–pe 10:30–15:00, 15 € (päivän erikoinen, keitto, salaatti, leipä, juoma)' }, en: { label: 'Lunch', value: 'Mon–Fri 10:30–15:00, €15 (daily special, soup, salad, bread, drink)' } },
      { fi: { label: 'À la carte', value: 'Iltaisin ja viikonloppuisin — burgereita, snacksejä, pääruokia, jälkiruokia (gluteeniton & vegaani-vaihtoehdot)' }, en: { label: 'À la carte', value: 'Evenings & weekends — burgers, snacks, mains, desserts (GF & vegan options)' } },
      { fi: { label: 'Aukiolot', value: 'Ma–ke 10:30–16, to 10:30–21, pe 10:30–23, la 16–23, su suljettu' }, en: { label: 'Hours', value: 'Mon–Wed 10:30–16, Thu 10:30–21, Fri 10:30–23, Sat 16–23, Sun closed' } },
      { fi: { label: 'Bottleshop', value: 'Auki klo 21:00 asti' }, en: { label: 'Bottleshop', value: 'Open until 21:00' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Ravintola · Baari · Panimo',
        title: 'HIISI Taproom & Bottleshop',
        subtitle: 'Lutakonaukio 3 — pienpanimon ravintola, baari ja pullopuoti yhdessä.',
      },
      about:
        'HIISI Taproom & Bottleshop yhdistää pienpanimon, ravintolan ja baarin Lutakonaukion laidalla. Arkisin 15 € lounas, iltaisin à la carte: burgereita, snacksejä ja pääruokia. Gluteeniton ja vegaani-vaihtoehdot. Bottleshop tarjoaa HIISIn omat oluet kotiin vietäväksi.',
      highlights: [
        'Lounas ma–pe 10:30–15 · 15 € sis. päivän erikoisen, keiton, salaatin, leivän ja juoman',
        'À la carte: burgerit, snackit, pääruoat, jälkiruoat (GF & vegaani)',
        'Bottleshop auki klo 21:00 saakka',
        'Pöytävaraukset puhelimitse tai verkossa; 7+ hengen ryhmät sähköpostilla',
        'Olutmaisteluja ja yksityinen kabinetti ryhmille',
        'Sijainti: Lutakonaukio 3, 40100 Jyväskylä · taproom@hiisi.beer · +358 50 339 9416',
      ],
      pitch:
        'HIISI on Lutakon vahvin oluttuottaja. Brändi-yhteistyö (etusivun sponsoroitu kortti tai event-takeover festivaalisesonkina) tavoittaa olutyhteisön ja festivaalikävijät.',
    },
    en: {
      hero: {
        eyebrow: 'Restaurant · Bar · Brewery',
        title: 'HIISI Taproom & Bottleshop',
        subtitle: 'Lutakonaukio 3 — microbrewery restaurant, bar and bottle shop in one.',
      },
      about:
        'HIISI Taproom & Bottleshop combines a microbrewery, restaurant and bar right by Lutakonaukio square. Weekday €15 lunch and evening à la carte: burgers, snacks and mains, with gluten-free and vegan options. The Bottleshop sells HIISI’s own beers to take home.',
      highlights: [
        'Lunch Mon–Fri 10:30–15:00 · €15 incl. daily special, soup, salad, bread, drink',
        'À la carte: burgers, snacks, mains, desserts (GF & vegan)',
        'Bottleshop open until 21:00',
        'Table reservations by phone or online; groups of 7+ by email',
        'Beer tastings and a private cabinet for groups',
        'Location: Lutakonaukio 3, 40100 Jyväskylä · taproom@hiisi.beer · +358 50 339 9416',
      ],
      pitch:
        'HIISI is the strongest craft-beer producer in Lutakko. Brand partnerships (homepage sponsored card or festival-season event takeovers) reach the beer community and festival-goers.',
    },
  },
  {
    slug: 'finlandia-marathon',
    kind: 'event',
    category: 'festivals-culture',
    themeColor: '#a78bfa',
    themeRgb: [167, 139, 250],
    image: null,
    url: 'https://finlandiamarathon.fi/',
    email: null,
    phone: null,
    address: 'Jyväskylä, Finland',
    facts: [],
    fi: {
      hero: {
        eyebrow: 'Tapahtuma · Liikunta',
        title: 'Finlandia Marathon',
        subtitle: 'Jyväskylän marathon-klassikko — sisältö täydentyy pian.',
      },
      about: 'Sisältö lisätään pian. Marathonin osallistujat täyttävät Lutakon palvelut tapahtumaviikonloppuna.',
      highlights: ['Sisältö täydentyy pian'],
      pitch:
        'Finlandia Marathon — sponsoripaketit ja tapahtumakohtainen näkyvyys reittikorttilla ja huoltopisteillä.',
    },
    en: {
      hero: {
        eyebrow: 'Event · Sport',
        title: 'Finlandia Marathon',
        subtitle: 'Jyväskylä’s marathon classic — content coming soon.',
      },
      about: 'Content to follow. The marathon’s participants fill Lutakko’s venues during the event weekend.',
      highlights: ['Content coming soon'],
      pitch:
        'Finlandia Marathon — sponsor packages and event-specific visibility on the route map and aid stations.',
    },
  },

  /* -------- Kansainväliset Suurmarkkinat -------- */
  {
    slug: 'kansainvaliset-suurmarkkinat',
    kind: 'event',
    category: 'festivals-culture',
    themeColor: '#fbbf24',
    themeRgb: [251, 191, 36],
    image: null,
    url: 'https://www.eurooppamarkkinat.fi/jyvaskyla/',
    email: 'tmk@markkina.net',
    phone: '+358 20 749 8700',
    address: 'Lutakonaukio, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Päivämäärät', value: '4.–7.6.2026' }, en: { label: 'Dates', value: '4–7 Jun 2026' } },
      { fi: { label: 'Aukiolot', value: 'To–La 10–20 · Su 10–18' }, en: { label: 'Hours', value: 'Thu–Sat 10:00–20:00 · Sun 10:00–18:00' } },
      { fi: { label: 'Sijainti', value: 'Lutakonaukio, Jyväskylä' }, en: { label: 'Location', value: 'Lutakonaukio square, Jyväskylä' } },
      { fi: { label: 'Maita', value: 'Yli 30 maan myyjät + suomalaiset alueet' }, en: { label: 'Countries', value: 'Vendors from 30+ countries + Finnish regions' } },
      { fi: { label: 'Sisäänpääsy', value: 'Maksuton' }, en: { label: 'Entry', value: 'Free' } },
      { fi: { label: 'Järjestäjä', value: 'TMK Tori- ja markkinakaupan palvelukeskus Oy' }, en: { label: 'Organizer', value: 'TMK Tori- ja markkinakaupan palvelukeskus Oy' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Tapahtuma · Kesäkuu',
        title: 'Kansainväliset Suurmarkkinat',
        subtitle: '4.–7.6.2026 Lutakonaukiolla — yli 30 maan myyjät, käsityöt, kansainvälinen ruoka ja lapsille karnevaaliattraktioita.',
      },
      about:
        'Jyväskylän Kansainväliset Suurmarkkinat tuovat Lutakonaukiolle yli 30 maan myyjät kesäkuun ensimmäisenä viikonloppuna. Tarjolla erikoistuotteita, kansainvälisiä ruokapisteitä, käsitöitä, tekstiilejä ja lasten karnevaalia — konsepti perustuu siihen, että tuottajat itse esittelevät ja myyvät tuotteitaan.',
      highlights: [
        'To 4.6. 10–20 · Pe 5.6. 10–20 · La 6.6. 10–20 · Su 7.6. 10–18',
        'Yli 30 maan myyjät + suomalaiset alueet',
        'Kansainväliset ruokapisteet, käsityöt, tekstiilit, erikoistuotteet',
        'Lasten karnevaaliattraktioita',
        'Maksuton sisäänpääsy',
        'Järjestäjä: TMK Tori- ja markkinakaupan palvelukeskus Oy · +358 20 749 8700 · tmk@markkina.net',
        'eurooppamarkkinat.fi/jyvaskyla',
      ],
      pitch:
        'Suurmarkkinat tuovat Lutakonaukiolle tuhansia kävijöitä neljän päivän aikana. Brändi- ja sponsorinäkyvyys tapahtumasivulla tavoittaa kesäkauden avausyleisön.',
    },
    en: {
      hero: {
        eyebrow: 'Event · June',
        title: 'International Grand Markets',
        subtitle: '4–7 June 2026 on Lutakonaukio — vendors from 30+ countries, crafts, international food and a children’s carnival.',
      },
      about:
        'Jyväskylä International Grand Markets bring vendors from over 30 countries to Lutakonaukio for the first weekend of June. The market features specialty goods, international food stations, crafts, textiles and a children’s carnival — built on the idea that producers themselves present and sell their products.',
      highlights: [
        'Thu–Sat 10:00–20:00 · Sun 10:00–18:00',
        'Vendors from 30+ countries + Finnish regions',
        'International food stations, crafts, textiles, specialty goods',
        'Children’s carnival attractions',
        'Free entry',
        'Operator: TMK Tori- ja markkinakaupan palvelukeskus Oy · +358 20 749 8700 · tmk@markkina.net',
        'eurooppamarkkinat.fi/jyvaskyla',
      ],
      pitch:
        'The Grand Markets pull thousands of visitors to Lutakonaukio over four days — strong brand and sponsor visibility for the early-summer audience.',
    },
  },

  /* -------- Konttiravintola Waves -------- */
  {
    slug: 'waves',
    kind: 'venue',
    category: 'food-sauna',
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    image: null,
    url: null,
    email: null,
    phone: '050 366 6736',
    address: 'Satamakatu 2 B, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Konttiravintola · länsimaista keittiötä, burgereita ja salaatteja' }, en: { label: 'Type', value: 'Container restaurant · Western cuisine, burgers and salads' } },
      { fi: { label: 'Aukeaa', value: 'Klo 10:30 alkaen' }, en: { label: 'Opens', value: 'From 10:30' } },
      { fi: { label: 'Sijainti', value: 'Satamakatu 2 B — Konttiravintola Mortonin naapurissa' }, en: { label: 'Location', value: 'Satamakatu 2 B — next door to Konttiravintola Morton' } },
      { fi: { label: 'Asiakasarvio', value: 'Google 4,4 / 5 (86 arviota)' }, en: { label: 'Customer rating', value: 'Google 4.4 / 5 (86 reviews)' } },
      { fi: { label: 'Yhteistyö', value: 'Sandels-olutkumppani' }, en: { label: 'Partnership', value: 'Sandels beer partner' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Konttiravintola · Burger',
        title: 'Konttiravintola Waves',
        subtitle: 'Satamakatu 2 B — burgereita ja salaatteja kontista, Sandels-oluella.',
      },
      about:
        'Konttiravintola Waves on Lutakon sataman vilkkaimpia kesäravintoloita Satamakatu 2 B:ssä, Konttiravintola Mortonin naapurissa. Menulla burgereita, salaatteja ja länsimaista pikaruokaa, Sandels-olut kumppanina. Google-arviointi 4,4/5 (86 arviota).',
      highlights: [
        'Burgerit ja salaatit kontti-ravintolasta',
        'Sandels-olutkumppani',
        'Avoinna klo 10:30 alkaen',
        'Sijainti: Satamakatu 2 B, 40100 Jyväskylä',
        'Puhelin: 050 366 6736',
        'Google-arvio 4,4 / 5 (86 arviota)',
      ],
      pitch:
        'Konttiravintola Waves — dedikoitu sivu Lutakko.info-etusivulla, menut ja sponsoroitu kortti Ruoka-osiossa.',
    },
    en: {
      hero: {
        eyebrow: 'Container restaurant · Burgers',
        title: 'Konttiravintola Waves',
        subtitle: 'Satamakatu 2 B — burgers and salads from a container, with Sandels beer.',
      },
      about:
        'Konttiravintola Waves is one of Lutakon Satama’s busiest summer container restaurants at Satamakatu 2 B, right next door to Konttiravintola Morton. The menu features burgers, salads and Western fast food, with Sandels beer as the partner brand. 4.4 / 5 on Google (86 reviews).',
      highlights: [
        'Burgers and salads from a shipping-container kitchen',
        'Sandels beer partner',
        'Open from 10:30',
        'Location: Satamakatu 2 B, 40100 Jyväskylä',
        'Phone: 050 366 6736',
        'Google rating 4.4 / 5 (86 reviews)',
      ],
      pitch:
        'Konttiravintola Waves — dedicated page on Lutakko.info, menus and a sponsored card in the Food section.',
    },
  },

  /* -------- Reserved Gym -------- */
  {
    slug: 'reserved-gym',
    kind: 'venue',
    category: 'festivals-culture',
    themeColor: '#22d3ee',
    themeRgb: [34, 211, 238],
    image: null,
    url: 'https://www.reservedgym.fi/',
    email: 'info@reservedgym.fi',
    phone: '+358 50 581 5372',
    address: 'Lutakonaukio 1, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Yksityinen kuntosali (tuntivaraus)' }, en: { label: 'Type', value: 'Private booking gym (hourly)' } },
      { fi: { label: 'Sijainti', value: 'Lutakonaukio 1, panoraamanäkymä aukiolle' }, en: { label: 'Location', value: 'Lutakonaukio 1, panoramic view over the square' } },
      { fi: { label: 'Konsepti', value: 'Varaa koko sali itsellesi tai pienelle ryhmälle (1 + 3 valmentajaa)' }, en: { label: 'Concept', value: 'Book the whole gym for yourself or a small group (1 + 3 trainers)' } },
      { fi: { label: 'Varaus', value: 'erp.asio.fi/onlinekalenturi/reservedgym' }, en: { label: 'Booking', value: 'erp.asio.fi/onlinekalenturi/reservedgym' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Liikunta · Kuntosali',
        title: 'Reserved Gym',
        subtitle: '"Yksityinen kuntosali Jyväskylän keskustassa" — Lutakonaukio 1.',
      },
      about:
        'Reserved Gym on tuntiperusteinen yksityiskuntosali Lutakonaukion laidalla. Varaa koko sali itsellesi tai pienelle ryhmälle — ei kuukausimaksua, vain tuntivarauksia. Sopii personal trainerille ja asiakkaalle (1 + jopa 3 valmentajaa per vuoro). Salin panoraamanäkymä avautuu Lutakonaukiolle.',
      highlights: [
        'Tuntivaraus — koko sali käytössäsi varauksen ajan',
        'Ei kuukausi- tai vuosijäsenmaksua',
        'Panoraamanäkymä Lutakonaukiolle',
        'Sopii personal trainereille (1 valmentaja + 3 asiakasta)',
        'Varaus: erp.asio.fi/onlinekalenturi/reservedgym',
        'Yhteys: info@reservedgym.fi · +358 50 581 5372',
      ],
      pitch:
        'Reserved Gym — Lutakko.info kävijöille suunnattu kuntosalivaraus. Voimme nostaa salin Liikunta-osion ykköskorttina ja ohjata varauksia.',
    },
    en: {
      hero: {
        eyebrow: 'Sports · Gym',
        title: 'Reserved Gym',
        subtitle: '"A private gym in the heart of Jyväskylä" — Lutakonaukio 1.',
      },
      about:
        'Reserved Gym is an hourly-booked private gym at the edge of Lutakonaukio. Reserve the entire facility for yourself or a small group — no monthly fees, just per-use bookings. Ideal for personal trainers and their clients (1 trainer + up to 3 clients per slot). Panoramic view over Lutakonaukio square.',
      highlights: [
        'Hourly booking — the whole gym is yours for the slot',
        'No monthly or annual membership fees',
        'Panoramic view over Lutakonaukio square',
        'Ideal for personal trainers (1 trainer + 3 clients)',
        'Booking: erp.asio.fi/onlinekalenturi/reservedgym',
        'Contact: info@reservedgym.fi · +358 50 581 5372',
      ],
      pitch:
        'Reserved Gym — visitor-facing booking partner for Lutakko.info. We can feature the gym as the top card in the Sports section and route bookings.',
    },
  },

  /* -------- Kielo Innova 1 -------- */
  {
    slug: 'innova-1',
    kind: 'venue',
    category: 'business',
    themeColor: '#a78bfa',
    themeRgb: [167, 139, 250],
    image: null,
    url: 'https://www.kielotoimitilat.fi/property/piippukatu-11/',
    email: 'minna.hamalainen@kielotoimitilat.fi',
    phone: '+358 40 564 8042',
    address: 'Piippukatu 11, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Operaattori', value: 'Kielo Toimitilat' }, en: { label: 'Operator', value: 'Kielo Toimitilat' } },
      { fi: { label: 'Sertifikaatti', value: 'BREEAM Very Good · 100 % vihreä sähkö ja kaukolämpö' }, en: { label: 'Certification', value: 'BREEAM Very Good · 100% green electricity & district heating' } },
      { fi: { label: 'Palvelut', value: 'Ravintola Fiilu, kokouskeskus, sauna ("Lutakon Huippu"), parkkihalli + sähköauton lataus, pyöräpaikat + e-pyörät' }, en: { label: 'Amenities', value: 'Fiilu restaurant, conference centre, "Lutakon Huippu" sauna, parking + EV charging, bike storage + e-bikes' } },
      { fi: { label: 'Etäisyydet', value: 'Linja-autoasema 400 m · juna-asema 400 m · lentokenttä 23 km' }, en: { label: 'Distances', value: 'Bus station 400 m · train station 400 m · airport 23 km' } },
      { fi: { label: 'Vuokraus', value: 'Minna Hämäläinen, Key Account Manager' }, en: { label: 'Leasing', value: 'Minna Hämäläinen, Key Account Manager' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Business · Toimitila',
        title: 'Innova 1',
        subtitle: 'Piippukatu 11 — Kielon edustava ja kestävän kehityksen mukainen toimistorakennus Lutakossa.',
      },
      about:
        'Innova 1 on Lutakon sydämessä sijaitseva moderni toimistorakennus, joka yhdistää keskeisen sijainnin, laadukkaat palvelut ja kestävän kehityksen. Joustavat ja muunneltavat toimitilat eri kokoisille yrityksille. BREEAM Very Good -sertifioitu, 100 % vihreä energia.',
      highlights: [
        'Osoite: Piippukatu 11, 40100 Jyväskylä',
        'BREEAM Very Good -sertifikaatti',
        'Ravintola Fiilu, kokouskeskus, sauna ja edustustila "Lutakon Huippu"',
        'Parkkihalli sähköauton latausasemilla; pyöräpaikat ja yhteiskäyttöiset e-pyörät',
        'Linja-autoasema ja juna-asema 400 m päässä',
        'Vuokraus: Minna Hämäläinen +358 40 564 8042 · minna.hamalainen@kielotoimitilat.fi',
      ],
      pitch:
        'Innova 1 — Lutakon yritysverkoston ydin. Lutakko.info voi yhdistää toimistovuokrauksen ja kävijä- / asiakasakvisitiopaketit yhdeksi kanavaksi.',
    },
    en: {
      hero: {
        eyebrow: 'Business · Office',
        title: 'Innova 1',
        subtitle: 'Piippukatu 11 — Kielo’s flagship sustainable office building in the heart of Lutakko.',
      },
      about:
        'Innova 1 is a modern office building in the heart of Lutakko combining central location, premium services and sustainability. Flexible, customisable spaces for companies of every size. BREEAM Very Good certification, 100% green energy.',
      highlights: [
        'Address: Piippukatu 11, 40100 Jyväskylä',
        'BREEAM Very Good certification',
        'Fiilu restaurant, conference centre, sauna and "Lutakon Huippu" representation space',
        'Parking garage with EV charging; bike storage + shared e-bikes',
        'Bus & train stations within 400 m',
        'Leasing: Minna Hämäläinen +358 40 564 8042 · minna.hamalainen@kielotoimitilat.fi',
      ],
      pitch:
        'Innova 1 — the core of Lutakko’s business network. Lutakko.info can bundle office leasing with visitor and client-acquisition packages.',
    },
  },

  /* -------- Kielo Innova 2 -------- */
  {
    slug: 'innova-2',
    kind: 'venue',
    category: 'business',
    themeColor: '#a78bfa',
    themeRgb: [167, 139, 250],
    image: null,
    url: 'https://www.kielotoimitilat.fi/property/lutakonaukio-7/',
    email: 'minna.hamalainen@kielotoimitilat.fi',
    phone: '+358 40 564 8042',
    address: 'Lutakonaukio 7, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Operaattori', value: 'Kielo Toimitilat' }, en: { label: 'Operator', value: 'Kielo Toimitilat' } },
      { fi: { label: 'Sertifikaatti', value: 'LEED Platinum · 100 % vihreä energia' }, en: { label: 'Certification', value: 'LEED Platinum · 100% green energy' } },
      { fi: { label: 'Kerroksia', value: '6' }, en: { label: 'Floors', value: '6' } },
      { fi: { label: 'Vapaina nyt', value: '112 m², 163 m², 166 m² yksiköt' }, en: { label: 'Available now', value: '112 m², 163 m², 166 m² units' } },
      { fi: { label: 'Palvelut', value: 'Parkkihalli + EV-lataus, sauna, kokoustilat, aulapalvelu, catering' }, en: { label: 'Amenities', value: 'Parking + EV charging, sauna, meeting rooms, lobby service, catering' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Business · Toimitila',
        title: 'Innova 2',
        subtitle: 'Lutakonaukio 7 — "Kestävää toimitilaa Lutakon sydämessä", LEED Platinum.',
      },
      about:
        'Innova 2 on kuusikerroksinen, LEED Platinum -sertifioitu toimistorakennus Jyväsjärven rannassa, Lutakon ytimessä. Joustavat toimitilakoot, sauna, kokoustilat ja kaikki Innova 1:n palvelut kävelymatkan päässä. Vapaina nyt 112 m², 163 m² ja 166 m² yksiköt.',
      highlights: [
        'Osoite: Lutakonaukio 7, 40100 Jyväskylä',
        '6 kerrosta · LEED Platinum · 100 % vihreä energia',
        'Vapaana 112 m², 163 m², 166 m²',
        'Parkkihalli + EV-lataus, sauna, kokoustilat, aulapalvelu',
        'Naapurin Innova 1:n ravintola, Paviljonki vieressä',
        'Vuokraus: Minna Hämäläinen +358 40 564 8042',
      ],
      pitch:
        'Innova 2 — premium-toimitilakumppani Lutakko.infon Business-osiossa.',
    },
    en: {
      hero: {
        eyebrow: 'Business · Office',
        title: 'Innova 2',
        subtitle: 'Lutakonaukio 7 — "Sustainable office space in Lutakko’s heart", LEED Platinum.',
      },
      about:
        'Innova 2 is a six-storey, LEED Platinum-certified office building on the shore of Jyväsjärvi, at the heart of Lutakko. Flexible unit sizes, sauna, meeting rooms and all Innova 1 services within walking distance. Available now: 112 m², 163 m², 166 m² units.',
      highlights: [
        'Address: Lutakonaukio 7, 40100 Jyväskylä',
        '6 floors · LEED Platinum · 100% green energy',
        'Available: 112 m², 163 m², 166 m²',
        'Parking + EV charging, sauna, meeting rooms, lobby service',
        'Restaurant in adjacent Innova 1; Paviljonki convention centre next door',
        'Leasing: Minna Hämäläinen +358 40 564 8042',
      ],
      pitch:
        'Innova 2 — premium office partner in Lutakko.info’s Business section.',
    },
  },

  /* -------- Jyväskylän Paviljonki -------- */
  {
    slug: 'paviljonki',
    kind: 'venue',
    category: 'business',
    themeColor: '#a78bfa',
    themeRgb: [167, 139, 250],
    image: null,
    url: 'https://www.paviljonki.fi/',
    email: 'paviljonki@paviljonki.fi',
    phone: '+358 14 339 8100',
    address: 'Lutakonaukio 12, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Tyyppi', value: 'Messukeskus, kongressitalo ja konserttisali (Jyväskylän Messut Oy)' }, en: { label: 'Type', value: 'Exhibition centre, congress house and concert hall (operated by Jyväskylän Messut Oy)' } },
      { fi: { label: 'Slogan', value: '"Suomen monipuolisin tapahtumatalo"' }, en: { label: 'Tagline', value: '"Finland’s most versatile event house"' } },
      { fi: { label: 'Käyttötarkoitukset', value: 'Messut, kongressit, seminaarit, yritystapahtumat, konsertit, gaalat' }, en: { label: 'Use cases', value: 'Trade fairs, congresses, seminars, corporate events, concerts, galas' } },
      { fi: { label: 'Palvelut', value: 'Omat ravintolat, AV-tekniikka, parkkihalli, Paviljonki Productions -tapahtumatuotanto' }, en: { label: 'Services', value: 'In-house restaurants, AV technology, parking, Paviljonki Productions in-house event management' } },
      { fi: { label: 'Tunnetut tapahtumat 2026', value: 'Cheerleadingin SM 13.–14.6. · BUS 2026 -messut 16.–17.6. · Secto Rally Finland Servicepark 30.7.–2.8. · Jyväskylä Sinfonia -konsertit' }, en: { label: 'Notable events 2026', value: 'Cheerleading SM 13–14 Jun · BUS 2026 trade fair 16–17 Jun · Secto Rally Finland Service Park 30 Jul – 2 Aug · Jyväskylä Sinfonia concerts' } },
      { fi: { label: 'Y-tunnus', value: '0626505-0' }, en: { label: 'Business ID', value: '0626505-0' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Business · Tapahtumatalo',
        title: 'Jyväskylän Paviljonki',
        subtitle: '"Suomen monipuolisin tapahtumatalo" Lutakonaukion vieressä — messut, kongressit, konsertit ja yritystapahtumat saman katon alla.',
      },
      about:
        'Paviljonki on Jyväskylän pääasiallinen tapahtumatalo ja Lutakon ydinrakennuksia: messukeskus, kongressisali ja konserttitila samassa kompleksissa Lutakonaukion laidalla. Operaattorina toimii Jyväskylän Messut Oy. Paikalla järjestetään ympäri vuoden suuria messuja, kongresseja, konsertteja, yritystapahtumia ja gaaloja — sekä toistuvasti Secto Rally Finlandin Servicepark. Talossa toimii myös oma tapahtumatuotantotiimi (Paviljonki Productions).',
      highlights: [
        'Osoite: Lutakonaukio 12, 40100 Jyväskylä',
        '"Suomen monipuolisin tapahtumatalo" — messut, kongressit, konsertit, gaalat',
        'Operaattori: Jyväskylän Messut Oy (Y 0626505-0)',
        'Omat ravintolat, AV-tekniikka, parkkihalli, Paviljonki Productions -tapahtumatuotanto',
        'Tunnettuja tapahtumia 2026: Cheerleading SM 13.–14.6., BUS 2026 16.–17.6., Secto Rally Finland Servicepark 30.7.–2.8., Jyväskylä Sinfonia',
        'Yhteys: +358 14 339 8100 · paviljonki@paviljonki.fi · paviljonki.fi',
      ],
      pitch:
        'Paviljonki on Lutakon yritys- ja tapahtumaverkoston ydin. Lutakko.info voi yhdistää näkyvyyspaketit, oheistapahtumat ja kävijöiden palvelut yhden kanavan kautta — etusivun sponsoroitu kortti tai event-takeover -slotti messuviikkojen ympärille.',
    },
    en: {
      hero: {
        eyebrow: 'Business · Event house',
        title: 'Jyväskylän Paviljonki',
        subtitle: '"Finland’s most versatile event house" right beside Lutakonaukio — trade fairs, congresses, concerts and corporate events under one roof.',
      },
      about:
        'Paviljonki is Jyväskylä’s principal event house and one of Lutakko’s core buildings: an exhibition centre, congress hall and concert venue in a single complex beside Lutakonaukio square. Operated by Jyväskylän Messut Oy, it hosts trade fairs, congresses, concerts, corporate events and galas year-round — and is the recurring home of the Secto Rally Finland Service Park. The in-house team Paviljonki Productions handles full event production.',
      highlights: [
        'Address: Lutakonaukio 12, 40100 Jyväskylä',
        '"Finland’s most versatile event house" — trade fairs, congresses, concerts, galas',
        'Operator: Jyväskylän Messut Oy (Business ID 0626505-0)',
        'In-house restaurants, AV technology, parking, Paviljonki Productions event production',
        'Notable events 2026: Cheerleading SM 13–14 Jun · BUS 2026 trade fair 16–17 Jun · Secto Rally Finland Service Park 30 Jul – 2 Aug · Jyväskylä Sinfonia',
        'Contact: +358 14 339 8100 · paviljonki@paviljonki.fi · paviljonki.fi',
      ],
      pitch:
        'Paviljonki is the core of Lutakko’s business and event network. Lutakko.info can route visibility packages, side events and visitor services through one channel — homepage sponsored card or event-takeover slot around major fair weeks.',
    },
  },

  /* -------- Kielo Innova 4 -------- */
  {
    slug: 'innova-4',
    kind: 'venue',
    category: 'business',
    themeColor: '#a78bfa',
    themeRgb: [167, 139, 250],
    image: null,
    url: 'https://www.kielotoimitilat.fi/property/lutakonaukio-1/',
    email: 'minna.hamalainen@kielotoimitilat.fi',
    phone: '+358 40 564 8042',
    address: 'Lutakonaukio 1, 40100 Jyväskylä',
    facts: [
      { fi: { label: 'Operaattori', value: 'Kielo Toimitilat' }, en: { label: 'Operator', value: 'Kielo Toimitilat' } },
      { fi: { label: 'Sertifikaatti', value: 'LEED Gold · 100 % vihreä energia' }, en: { label: 'Certification', value: 'LEED Gold · 100% green energy' } },
      { fi: { label: 'Vapaina nyt', value: '51 m² ja 69 m² toimistot' }, en: { label: 'Available now', value: '51 m² and 69 m² offices' } },
      { fi: { label: 'Palvelut', value: 'Parkkihalli + EV-lataus, sauna (Vasikkasaari-järvinäkymin), kokoustilat, kuntosali (Reserved Gym), ruokakauppa' }, en: { label: 'Amenities', value: 'Parking + EV charging, sauna (Vasikkasaari lake views), meeting rooms, gym (Reserved Gym), grocery store' } },
    ],
    fi: {
      hero: {
        eyebrow: 'Business · Toimitila',
        title: 'Innova 4',
        subtitle: 'Lutakonaukio 1 — "Viihtyisä työympäristö Lutakon sydämessä", LEED Gold.',
      },
      about:
        'Innova 4 on LEED Gold -sertifioitu moderni toimistorakennus Lutakon sydämessä. Joustavat toimistokoot pienille ja keskisuurille yrityksille; talossa kuntosali (Reserved Gym), ruokakauppa, sauna järvinäkymin, kokoustilat ja parkkihalli sähköauton latauksella.',
      highlights: [
        'Osoite: Lutakonaukio 1, 40100 Jyväskylä',
        'LEED Gold · 100 % vihreä energia',
        'Vapaana 51 m² ja 69 m² toimistot',
        'Talossa: kuntosali (Reserved Gym), ruokakauppa, kokoustilat',
        'Sauna Vasikkasaaren järvinäkymin',
        'Linja-auto- ja juna-asema 750 m päässä',
      ],
      pitch:
        'Innova 4 — kompaktit toimistot ja Lutakko.infon ristiinmainonta naapuripalveluista (mm. Reserved Gym samassa rakennuksessa).',
    },
    en: {
      hero: {
        eyebrow: 'Business · Office',
        title: 'Innova 4',
        subtitle: 'Lutakonaukio 1 — "A pleasant work environment in Lutakko’s heart", LEED Gold.',
      },
      about:
        'Innova 4 is a LEED Gold-certified modern office building at the heart of Lutakko. Flexible office sizes for small and mid-sized companies; the building hosts a gym (Reserved Gym), a grocery store, a lake-view sauna, meeting rooms and a parking garage with EV charging.',
      highlights: [
        'Address: Lutakonaukio 1, 40100 Jyväskylä',
        'LEED Gold · 100% green energy',
        'Available: 51 m² and 69 m² offices',
        'In-building: gym (Reserved Gym), grocery store, meeting rooms',
        'Sauna with Vasikkasaari lake views',
        'Bus & train stations within 750 m',
      ],
      pitch:
        'Innova 4 — compact offices and Lutakko.info cross-promotion with neighbouring services (incl. Reserved Gym in the same building).',
    },
  },
);

export function getVenue(slug: string): VenueEntry | undefined {
  return VENUES.find((v) => v.slug === slug);
}

export const VENUES_BY_CATEGORY: Record<string, VenueEntry[]> = VENUES.reduce(
  (acc, v) => {
    acc[v.category] = acc[v.category] ?? [];
    acc[v.category].push(v);
    return acc;
  },
  {} as Record<string, VenueEntry[]>,
);
