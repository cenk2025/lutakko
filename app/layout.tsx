import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

const display = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lutakko.info — Lutakon Satama',
  description:
    'Lutakko.info on Lutakon Sataman virallinen kävijä- ja kumppanisivusto. Lutakon Satama on Päijänteen pohjoisin matkustajasatama Jyväskylän sydämessä — festivaaleja, ravintolalaivoja, saunaa ja perheaktiviteetteja.',
  keywords: [
    'Lutakko.info',
    'Lutakko',
    'Jyväskylä',
    'Lutakon Satama',
    'Suomen elämyksellisin satama',
    'SuomiPop',
    'Secto Rally Finland',
    'WRC',
    'OlutSatama',
    'beer festival',
    'Saunaravintola Sataman Viilu',
    'Sataman Viilu',
    'Tanssisali Lutakko',
    'Jelmu',
    'Konttiravintola Morton',
    'Morton',
    'Musta Magia',
    'Limanda',
    'Sataman Kahvila',
    'MatkaRhea',
    'Lutakonaukio',
    'Jyväskylän Rantaraitti',
    'Kuokkalan silta',
    'Alvar Aalto',
    'Paviljonki',
    'marina',
    'restaurants',
    'Päijänne',
    'culture',
    'Finland',
  ],
  openGraph: {
    title: 'Lutakko.info — Lutakon Satama',
    description:
      'A premium interactive scrollytelling tour through festivals, food, sauna, marina and family life on Jyväskylä’s Lutakon Satama waterfront.',
    type: 'website',
    locale: 'fi_FI',
    siteName: 'Lutakko.info',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#05070d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body className="min-h-screen bg-ink text-white antialiased">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
