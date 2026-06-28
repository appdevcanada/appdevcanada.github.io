import { getTranslations } from 'next-intl/server';
import { Nav } from '@/components/Nav';
import { PresenceTrackerTabs } from '@/components/PresenceTrackerTabs';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'apps.presencetracker' });
  return {
    title: `${t('name')} — App Dev Canada`,
    description: t('desc'),
  };
}

export default function PresenceTrackerDetailsPage() {
  return (
    <>
      <Nav />
      <div className="hero-gradient relative py-16 sm:py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />
        <div className="relative z-10">
          <p className="section-label mb-3">App Dev Canada</p>
          <h1 className="text-copy text-3xl sm:text-4xl font-bold tracking-tight">PresenceTracker</h1>
        </div>
      </div>
      <main className="max-w-3xl mx-auto px-6 pb-20 pt-10">
        <PresenceTrackerTabs />
        <div className="pt-8 border-t border-border">
          <Link href="/" className="text-[13px] text-muted hover:text-label transition-colors duration-150">
            ← Back
          </Link>
        </div>
      </main>
    </>
  );
}
