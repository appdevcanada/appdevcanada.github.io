import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';

const PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/presencetracker_details', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/presencetracker/privacy', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
