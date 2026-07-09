import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/Nav';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, localizedAlternates } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const pageTitle = `${t('title')} — PresenceTracker`;
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

/* ─── Section block ─────────────────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-t border-border">
      <p className="section-label mb-3">{title}</p>
      <div className="space-y-3 text-[14px] text-label leading-relaxed">{children}</div>
    </div>
  );
}

/* ─── Content ───────────────────────────────────────────────────────────── */
function PrivacyContent() {
  const t = useTranslations('privacy');
  const storageItems = t.raw('storageItems') as string[];

  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">

      {/* Summary — tri-gradient card */}
      <div className="card-gradient border border-border rounded-2xl px-6 py-5 my-8 text-[14px] text-label leading-relaxed">
        <strong className="text-copy font-semibold">{t('summaryLabel')}</strong>{' '}
        {t('summaryText')}
      </div>

      <Section title={t('collectTitle')}>
        <p>{t('collectText')}</p>
      </Section>

      <Section title={t('storageTitle')}>
        <p>{t('storageText')}</p>
        <ul className="mt-3 space-y-1">
          {storageItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-muted mt-0.5 flex-shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">{t('storageNote')}</p>
      </Section>

      <Section title={t('thirdPartyTitle')}>
        <p>{t('thirdPartyText')}</p>
      </Section>

      <Section title={t('permissionsTitle')}>
        <p>{t('permissionsText')}</p>
      </Section>

      <Section title={t('childrenTitle')}>
        <p>{t('childrenText')}</p>
      </Section>

      <Section title={t('changesTitle')}>
        <p>{t('changesText')}</p>
      </Section>

      <Section title={t('contactTitle')}>
        <p>
          {t('contactText')}{' '}
          <a href="mailto:contact@appdevcanada.ca" className="text-accent hover:underline">
            contact@appdevcanada.ca
          </a>
          .
        </p>
      </Section>

      <div className="pt-8 border-t border-border">
        <Link
          href="/"
          className="text-[13px] text-muted hover:text-label transition-colors duration-150"
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
