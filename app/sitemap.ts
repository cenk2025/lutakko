import type { MetadataRoute } from 'next';
import { VENUES } from '@/data/venues';
import { SITE_URL } from '@/lib/jsonld';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const root: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        fi: `${SITE_URL}/`,
        en: `${SITE_URL}/`,
      },
    },
  };

  const venues: MetadataRoute.Sitemap = VENUES.map((v) => ({
    url: `${SITE_URL}/venues/${v.slug}/`,
    lastModified: now,
    changeFrequency: v.kind === 'event' ? 'weekly' : 'monthly',
    priority: v.kind === 'event' ? 0.9 : 0.8,
    alternates: {
      languages: {
        fi: `${SITE_URL}/venues/${v.slug}/`,
        en: `${SITE_URL}/venues/${v.slug}/`,
      },
    },
  }));

  return [root, ...venues];
}
