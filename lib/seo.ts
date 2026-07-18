import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://www.appdevcanada.ca';
export const SITE_NAME = 'App Dev Canada';

const OG_LOCALES: Record<string, string> = {
  en: 'en_CA',
  fr: 'fr_CA',
  es: 'es_ES',
  pt: 'pt_BR',
  zh: 'zh_CN',
};

export function ogLocale(locale: string): string {
  return OG_LOCALES[locale] ?? 'en_CA';
}

/** Canonical + hreflang alternates for a locale-agnostic pathname (e.g. '', '/privacy'). */
export function localizedAlternates(locale: string, pathname: string) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${pathname}`])
  );
  return {
    canonical: `${SITE_URL}/${locale}${pathname}`,
    languages: {
      ...languages,
      'x-default': `${SITE_URL}/${routing.defaultLocale}${pathname}`,
    },
  };
}
