import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'es', 'pt', 'zh'] as const,
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];
