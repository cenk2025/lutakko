import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { VENUES, getVenue } from '@/data/venues';
import { breadcrumbLd, venueLd, SITE_URL } from '@/lib/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import VenuePageClient from './client';

export const dynamicParams = false;

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const venue = getVenue(params.slug);
  if (!venue) return {};

  const fi = venue.fi.hero;
  const en = venue.en.hero;
  const path = `/venues/${venue.slug}/`;
  const ogImage = venue.image ? `${SITE_URL}${venue.image}` : `${SITE_URL}/og-default.svg`;

  const title = fi.title === en.title ? fi.title : `${fi.title} · ${en.title}`;

  return {
    title,
    description: `${fi.subtitle} — ${en.subtitle}`,
    alternates: {
      canonical: path,
      languages: {
        fi: path,
        en: path,
        'x-default': path,
      },
    },
    openGraph: {
      title: `${fi.title} — Lutakko.info`,
      description: en.subtitle,
      url: `${SITE_URL}${path}`,
      siteName: 'Lutakko.info',
      images: [{ url: ogImage, width: 1200, height: 630, alt: en.title }],
      locale: 'fi_FI',
      alternateLocale: ['en_US'],
      type: venue.kind === 'event' ? 'website' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fi.title} — Lutakko.info`,
      description: en.subtitle,
      images: [ogImage],
    },
  };
}

export default function VenuePage({ params }: { params: { slug: string } }) {
  const venue = getVenue(params.slug);
  if (!venue) notFound();

  const ld = [
    venueLd(venue, 'fi'),
    breadcrumbLd([
      { name: 'Lutakko.info', url: '/' },
      { name: venue.kind === 'event' ? 'Tapahtumat' : 'Ruoka & Sauna', url: '/' },
      { name: venue.fi.hero.title, url: `/venues/${venue.slug}/` },
    ]),
  ];

  return (
    <>
      <JsonLd data={ld} id={`venue-${venue.slug}`} />
      <VenuePageClient slug={venue.slug} />
    </>
  );
}
