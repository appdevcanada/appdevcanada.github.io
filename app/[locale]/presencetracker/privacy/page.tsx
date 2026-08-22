import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/Nav';
import { PrivacyPolicyBody } from '@/components/PrivacyPolicyBody';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, localizedAlternates } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const pageTitle = t('title');
  const description = t('summaryText');
  const fullTitle = `${pageTitle} — ${SITE_NAME}`;

  return {
    title: pageTitle,
    description,
    alternates: localizedAlternates(locale, '/presencetracker/privacy'),
    openGraph: { title: fullTitle, description, url: `${SITE_URL}/${locale}/presencetracker/privacy` },
    twitter: { title: fullTitle, description },
  };
}

/* ─── Mini hero ─────────────────────────────────────────────────────────── */
function PageHero() {
  const t = useTranslations('privacy');
  return (
    <div className="hero-gradient relative py-16 sm:py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />
      <div className="relative z-10">
        <p className="section-label mb-3">{t('eyebrow')}</p>
        <h1 className="text-copy text-3xl sm:text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted text-[13px] mt-3">{t('updated')}</p>
      </div>
    </div>
  );
}

/* ─── Content ───────────────────────────────────────────────────────────── */
function PrivacyContent() {
  const t = useTranslations('privacy');

  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <div className="pt-8">
        <PrivacyPolicyBody />
      </div>

      <div className="pt-8 border-t border-border">
        <Link
          href="/"
          className="text-[13px] text-copy font-semibold hover:text-label transition-colors duration-150"
        >
          {t('back')}
        </Link>
      </div>

    </main>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <PageHero />
      <PrivacyContent />
    </>
  );
}
