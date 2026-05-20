import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign-in callback',
  description: 'Lutakko.info authentication callback.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AuthCallbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
