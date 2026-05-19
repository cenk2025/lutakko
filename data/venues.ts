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
  category: 'festivals-culture' | 'food-sauna' | 'marina-recreation';
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
