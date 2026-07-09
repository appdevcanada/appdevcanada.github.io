import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: 'Focused mobile apps, crafted in Canada.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07080f',
    theme_color: '#c22018',
    icons: [
      { src: '/images/favicon.png', sizes: '269x278', type: 'image/png' },
      { src: '/images/logo.png', sizes: '346x365', type: 'image/png' },
    ],
  };
}
