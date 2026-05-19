import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
import VenuePageClient from './client';

export const dynamicParams = false;

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export default function VenuePage({ params }: { params: { slug: string } }) {
  const venue = VENUES.find((v) => v.slug === params.slug);
  if (!venue) notFound();
  return <VenuePageClient slug={venue.slug} />;
}
