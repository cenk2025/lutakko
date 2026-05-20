import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import JsonLd from '@/components/seo/JsonLd';
import { organizationLd, websiteLd } from '@/lib/jsonld';
import './globals.css';

const display = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const SITE_URL = 'https://lutakko.info';

const PRIMARY_DESCRIPTION_FI =
  'Lutakko.info on Lutakon Sataman virallinen kävijä- ja kumppanisivusto. Päijänteen pohjoisin matkustajasatama Jyväskylän sydämessä — 46 vierasvenepaikkaa, ravintolalaivoja, Saunaravintola Sataman Viilu, Tanssisali Lutakko, SuomiPop, Secto Rally Finland, OlutSatama ja 13 km Rantaraitti.';

const PRIMARY_DESCRIPTION_EN =
  'Lutakko.info is the official visitor and partner site for Lutakon Satama — Päijänne’s northernmost passenger harbour at the heart of Jyväskylä. 46 guest berths, restaurant ships, Saunaravintola Sataman Viilu, Tanssisali Lutakko, SuomiPop, Secto Rally Finland, OlutSatama and the 13 km Rantaraitti promenade.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Lutakko.info',
  title: {
    default: 'Lutakko.info — Lutakon Satama, Jyväskylä',
    template: '%s · Lutakko.info',
  },
  description: PRIMARY_DESCRIPTION_FI + ' · ' + PRIMARY_DESCRIPTION_EN,
  keywords: [
    'Lutakko.info',
    'Lutakko',
    'Jyväskylä',
    'Lutakon Satama',
    'Suomen elämyksellisin satama',
    'Päijänteen pohjoisin matkustajasatama',
    'SuomiPop',
    'SuomiPop Festival',
    'Secto Rally Finland',
    'WRC',
    'OlutSatama',
    'beer festival',
    'Finlandia Marathon',
    'Saunaravintola Sataman Viilu',
    'Sataman Viilu',
    'Tanssisali Lutakko',
    'Jelmu',
    'Konttiravintola Morton',
    'Morton',
    'M/S Musta Magia',
    'Limanda',
    'Sataman Kahvila',
    'MatkaRhea',
    'Ravintolalaiva Gaia',
    'HIISI-panimo',
    'Saunalautta',
    'Lutakonaukio',
    'Jyväskylän Rantaraitti',
    'Kuokkalan silta',
    'Alvar Aalto',
    'Paviljonki',
    'marina',
    'guest berths',
    'restaurants',
    'Päijänne',
    'culture',
    'events',
    'Finland',
  ],
  authors: [{ name: 'Voon IQ', url: 'https://voon.fi' }],
  creator: 'Voon IQ',
  publisher: 'Voon IQ',
  alternates: {
    canonical: '/',
    languages: {
      fi: '/',
      en: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Lutakko.info — Lutakon Satama, Jyväskylä',
    description: PRIMARY_DESCRIPTION_EN,
    url: SITE_URL,
    siteName: 'Lutakko.info',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Lutakko.info — Lutakon Satama, Jyväskylä',
      },
    ],
    locale: 'fi_FI',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lutakko.info — Lutakon Satama, Jyväskylä',
    description: PRIMARY_DESCRIPTION_EN,
    images: ['/og-default.svg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  category: 'travel',
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: '#05070d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className={display.variable}>
      <body className="min-h-screen bg-ink text-white antialiased">
        {/* Global structured data — applies to every route */}
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
