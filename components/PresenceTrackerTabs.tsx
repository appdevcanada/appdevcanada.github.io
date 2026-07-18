'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ImAndroid } from 'react-icons/im';

const TECH_CHIPS = [
  'React Native', 'Expo', 'TypeScript', 'iOS', 'Android', 'SQLite', 'NativeWind',
];

const APP_STORE_URL = 'https://apps.apple.com/us/app/presencetracker/id6787793972';

function StoreLinks() {
  const t = useTranslations('apps.presencetracker');
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-90 transition-opacity duration-150"
      >
        <Image
          src="/images/app-store-badge.png"
          alt={t('appStore')}
          width={295}
          height={88}
          unoptimized
          className="h-11 w-auto"
        />
      </a>
      <span
        aria-disabled="true"
        className="inline-flex items-center gap-2.5 h-11 px-4 rounded-xl bg-surface border border-border text-muted font-semibold text-[13.5px] cursor-not-allowed"
      >
        <ImAndroid size={18} aria-hidden="true" />
        {t('googlePlaySoon')}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-t border-border">
      <p className="section-label mb-3">{title}</p>
      <div className="space-y-3 text-[14px] text-label leading-relaxed">{children}</div>
    </div>
  );
}

function AboutTab() {
  const t = useTranslations('apps.presencetracker');
  const features = [
    t('feature1'), t('feature2'), t('feature3'), t('feature4'),
  ];
  return (
    <div className="space-y-6">
      {/* App identity */}
      <div className="flex items-center gap-5">
        <Image
          src="/images/presencetracker-icon.svg"
          alt="PresenceTracker icon"
          width={80}
          height={80}
          unoptimized
          className="rounded-[18px] flex-shrink-0"
        />
        <div>
          <h2 className="text-copy text-xl font-bold">{t('name')}</h2>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted mt-1">{t('category')}</p>
        </div>
      </div>

      {/* Store links */}
      <StoreLinks />

      {/* Description */}
      <p className="text-label text-[14.5px] leading-relaxed">{t('desc')}</p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2">
        {features.map((f) => (
          <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium bg-brand-green/10 text-brand-green border border-brand-green/20">
            <span aria-hidden>✓</span> {f}
          </span>
        ))}
      </div>

      {/* Tech stack */}
      <div className="border-t border-border pt-6 pb-6">
        <p className="section-label mb-4">Technologies</p>
        <div className="flex flex-wrap gap-2">
          {TECH_CHIPS.map((chip) => (
            <span key={chip} className="px-3 py-1.5 rounded-lg text-[12.5px] font-medium bg-surface border border-border text-label">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacyTab() {
  const t = useTranslations('privacy');
  const storageItems = t.raw('storageItems') as string[];
  return (
    <div>
      <div className="card-gradient border border-border rounded-2xl px-6 py-5 mb-2 text-[14px] text-label leading-relaxed">
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
          </a>.
        </p>
      </Section>
    </div>
  );
}

export function PresenceTrackerTabs() {
  const [active, setActive] = useState<'about' | 'privacy'>('about');
  const tPrivacy = useTranslations('privacy');

  const tabs = [
    { key: 'about' as const,   label: 'About' },
    { key: 'privacy' as const, label: tPrivacy('title') },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-border mb-8">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`px-5 py-3 text-sm font-semibold transition-colors duration-150 -mb-px border-b-2 ${
              active === key
                ? 'text-accent border-accent'
                : 'text-muted border-transparent hover:text-label'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {active === 'about'   && <AboutTab />}
      {active === 'privacy' && <PrivacyTab />}
    </div>
  );
}
