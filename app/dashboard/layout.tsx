import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hallintapaneeli',
  description: 'Lutakko.info dashboard — private area for logged-in users.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
