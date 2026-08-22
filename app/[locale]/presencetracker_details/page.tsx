import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Nav } from '@/components/Nav';
import { PresenceTrackerTabs, StoreLinks } from '@/components/PresenceTrackerTabs';
import { SiteFooter } from '@/components/SiteFooter';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, localizedAlternates } from '@/lib/seo';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/presencetracker-links';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'apps.presencetracker' });
  const pageTitle = t('name');
  const description = t('desc');
  const fullTitle = `${pageTitle} — ${SITE_NAME}`;

  return {
    title: pageTitle,
    description,
    alternates: localizedAlternates(locale, '/presencetracker_details'),
    openGraph: { title: fullTitle, description, url: `${SITE_URL}/${locale}/presencetracker_details` },
    twitter: { title: fullTitle, description },
  };
}

export default async function PresenceTrackerDetailsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'apps.presencetracker' });

  const softwareAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t('name'),
    description: t('desc'),
    applicationCategory: 'ProductivityApplication',
    operatingSystem: GOOGLE_PLAY_URL ? 'iOS, Android' : 'iOS',
    url: `${SITE_URL}/${locale}/presencetracker_details`,
    image: `${SITE_URL}/images/presencetracker-icon.png`,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    downloadUrl: GOOGLE_PLAY_URL ? [APP_STORE_URL, GOOGLE_PLAY_URL] : APP_STORE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Nav />
      <div className="hero-gradient relative py-16 sm:py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />
        <div className="relative z-10 flex flex-col items-center">
          <p className="section-label mb-3">App Dev Canada</p>
          <Image
            src="/images/presencetracker-icon.svg"
            alt={t('name')}
            width={112}
            height={112}
            unoptimized
            className="mb-4"
          />
          <h1 className="text-copy text-3xl sm:text-4xl font-bold tracking-tight">{t('name')}</h1>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted mt-2 mb-5">{t('category')}</p>
          <StoreLinks />
        </div>
      </div>
      <main className="max-w-3xl mx-auto px-6 pb-20 pt-10">
        <PresenceTrackerTabs />
        <div className="pt-8 border-t border-border">
          <Link href="/" className="text-[13px] text-copy font-semibold hover:text-label transition-colors duration-150">
            ← Back
          </Link>
        </div>
        <SiteFooter />
      </main>
    </>
  );
}
