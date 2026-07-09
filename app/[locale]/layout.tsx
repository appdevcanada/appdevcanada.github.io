import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE_URL, SITE_NAME, ogLocale } from '@/lib/seo';
import '@/app/globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tAbout = await getTranslations({ locale, namespace: 'about' });

  const title = `${SITE_NAME} — ${t('tagline')}`;
  const description = tAbout('text');

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    keywords: [
      'App Dev Canada',
      'mobile app development Canada',
      'iOS app developer',
      'Android app developer',
      'independent app studio',
    ],
    icons: {
      icon: '/images/favicon.png',
      apple: '/images/favicon.png',
    },
    manifest: '/manifest.webmanifest',
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      locale: ogLocale(locale),
      url: `${SITE_URL}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  email: 'contact@appdevcanada.ca',
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        {/* Remove dark class only if user previously chose light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
