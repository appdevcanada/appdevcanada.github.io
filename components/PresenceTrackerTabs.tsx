'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FcTimeline } from 'react-icons/fc';
import { HiOutlineShieldCheck, HiOutlineCalendarDays, HiOutlineDocumentArrowDown, HiOutlineGlobeAlt } from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/presencetracker-links';
import { PrivacyPolicyBody } from '@/components/PrivacyPolicyBody';

const SCREENSHOT_FRAME = 'w-full sm:w-[42%] flex-shrink-0 flex items-center justify-center h-[370px] overflow-hidden';
const SCREENSHOT_IMG = 'h-full w-auto object-contain rounded-2xl';

export function StoreLinks() {
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
          src="/images/app-store-badge.svg"
          alt={t('appStore')}
          width={135}
          height={40}
          unoptimized
          className="h-10 w-auto"
        />
      </a>
      <a
        href={GOOGLE_PLAY_URL ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-90 transition-opacity duration-150"
      >
        <Image
          src="/images/google-play-badge.svg"
          alt={t('googlePlay')}
          width={180}
          height={53.333}
          unoptimized
          className="h-10 w-auto"
        />
      </a>
    </div>
  );
}

const TINT_CLASSES = {
  red: 'card-red border-accent/25',
  green: 'card-green border-brand-green/25',
  blue: 'card-blue border-brand-blue/25',
} as const;

function FeatureRow({
  tint,
  reverse,
  media,
  children,
}: {
  tint: keyof typeof TINT_CLASSES;
  reverse?: boolean;
  media: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`${TINT_CLASSES[tint]} border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center`}>
      <div className={`flex-1 ${reverse ? 'sm:order-2' : ''}`}>{children}</div>
      <div className={`w-full sm:w-[42%] flex-shrink-0 flex items-center justify-center h-[340px] overflow-hidden ${reverse ? 'sm:order-1' : ''}`}>
        {media}
      </div>
    </div>
  );
}

const SEGMENT_COLOR: Record<string, string> = {
  visitor: 'bg-brand-blue',
  student: 'bg-brand-blue/55',
  workPermit: 'bg-muted/50',
  permanentResident: 'bg-brand-green',
};

function StatusHistoryTimeline() {
  const t = useTranslations('apps.presencetracker.whatsNew');
  const segments = [
    { key: 'visitor', width: 20 },
    { key: 'student', width: 15 },
    { key: 'workPermit', width: 25 },
    { key: 'permanentResident', width: 40 },
  ];
  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="flex h-3.5 w-full overflow-hidden">
        {segments.map((s) => (
          <span key={s.key} className={SEGMENT_COLOR[s.key]} style={{ width: `${s.width}%` }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold text-muted">
        {segments.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1">
            <i className={`inline-block w-2 h-2 rounded-sm ${SEGMENT_COLOR[s.key]}`} />
            {t(s.key)}
          </span>
        ))}
      </div>
    </div>
  );
}

function ReasonCard({ tint, icon: Icon, title, desc }: { tint: 'red' | 'green' | 'blue'; icon: IconType; title: string; desc: string }) {
  const badge = tint === 'red' ? 'text-accent bg-accent/10' : tint === 'green' ? 'text-brand-green bg-brand-green/10' : 'text-brand-blue bg-brand-blue/10';
  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${badge}`}><Icon size={18} /></div>
      <h3 className="font-semibold text-copy text-sm mb-1">{title}</h3>
      <p className="text-label text-[13px] leading-relaxed">{desc}</p>
    </div>
  );
}

function WhatsNewSection() {
  const t = useTranslations('apps.presencetracker.whatsNew');
  const cards = t.raw('cards') as { title: string; desc: string }[];
  const cardTints: Array<'blue' | 'green' | 'red'> = ['blue', 'green', 'red'];
  const cardIcons: IconType[] = [HiOutlineCalendarDays, HiOutlineDocumentArrowDown, HiOutlineGlobeAlt];

  return (
    <div className="pt-8 border-t border-border space-y-5">
      <p className="section-label">{t('label')}</p>

      <div className="card-red border border-accent/25 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex-1 sm:order-2">
          <p className="section-label mb-1">{t('kickerLabel')}</p>
          <h3 className="text-copy text-lg font-bold mb-2">{t('kickerTitle')}</h3>
          <p className="text-label text-[13.5px] leading-relaxed">{t('kickerText')}</p>
        </div>
        <div className="w-full sm:w-[42%] flex-shrink-0 flex items-center justify-center h-[340px] sm:order-1">
          <FcTimeline size={110} />
        </div>
      </div>

      <FeatureRow tint="green" media={<StatusHistoryTimeline />}>
        <h3 className="text-copy text-base font-bold mb-2">{t('statusHistoryTitle')}</h3>
        <p className="text-label text-[13.5px] leading-relaxed">{t('statusHistoryText')}</p>
      </FeatureRow>

      <FeatureRow
        tint="blue"
        reverse
        media={
          <Image
            src="/images/presencetracker-screenshot-backup.png"
            alt={t('backupTitle')}
            width={1320}
            height={2868}
            className={SCREENSHOT_IMG}
          />
        }
      >
        <h3 className="text-copy text-base font-bold mb-2">{t('backupTitle')}</h3>
        <p className="text-label text-[13.5px] leading-relaxed">{t('backupText')}</p>
      </FeatureRow>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <ReasonCard key={card.title} tint={cardTints[i % cardTints.length]} icon={cardIcons[i % cardIcons.length]} title={card.title} desc={card.desc} />
        ))}
      </div>
    </div>
  );
}

function EverythingItDoesSection() {
  const t = useTranslations('apps.presencetracker.features');
  const categories = t.raw('categories') as { title: string; items: string[] }[];
  const [open, setOpen] = useState(0);

  return (
    <div className="pt-8 border-t border-border">
      <p className="section-label mb-4">{t('label')}</p>
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex-1 w-full border border-border rounded-2xl overflow-hidden">
          {categories.map((cat, i) => (
            <div key={cat.title} className={i > 0 ? 'border-t border-border' : ''}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left text-[13.5px] font-bold text-copy bg-surface"
              >
                {cat.title}
                <span className="text-muted font-normal text-base ml-3">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <ul className="px-4 pb-4 space-y-2.5 bg-surface">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-2 text-[13px] text-label leading-relaxed">
                      <span className="text-brand-green font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="w-full sm:w-[42%] flex-shrink-0 flex items-center justify-center h-[560px] overflow-hidden">
          <Image
            src="/images/presencetracker-screenshot-settings.png"
            alt={t('label')}
            width={1320}
            height={2868}
            className={SCREENSHOT_IMG}
          />
        </div>
      </div>
    </div>
  );
}

function TrustSection() {
  const t = useTranslations('apps.presencetracker.trust');
  return (
    <div className="pt-8 border-t border-border">
      <p className="section-label mb-4">{t('label')}</p>
      <FeatureRow tint="green" reverse media={<HiOutlineShieldCheck className="text-brand-green" size={110} />}>
        <p className="text-[14px] leading-relaxed text-copy">
          <strong className="text-brand-green">{t('title')}</strong> {t('text')}
        </p>
      </FeatureRow>
    </div>
  );
}

function PricingSection() {
  const t = useTranslations('apps.presencetracker.pricing');
  return (
    <div className="pt-8 border-t border-border">
      <p className="section-label mb-4">Pricing</p>
      <div className="card-red border border-accent/25 rounded-2xl p-8 text-center">
        <p className="section-label mb-0">{t('label')}</p>
        <p className="text-copy text-2xl font-bold mt-1.5 mb-1">{t('headline')}</p>
        <p className="text-muted text-[13px] mb-5">{t('note')}</p>
        <a
          href="/presencetracker/get"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-accent text-white font-semibold text-[14px] hover:bg-accent/85 transition-colors duration-150"
        >
          {t('cta')}
        </a>
      </div>
    </div>
  );
}

function DisclaimerBox() {
  const t = useTranslations('apps.presencetracker');
  return (
    <div className="pt-8 border-t border-border">
      <p className="section-label mb-3">Legal</p>
      <div className="flex gap-3 px-5 py-4 rounded-2xl border border-border bg-surface2 text-[12.5px] leading-relaxed text-muted">
        <span aria-hidden className="flex-shrink-0">ⓘ</span>
        <span>{t('disclaimer')}</span>
      </div>
    </div>
  );
}

function AboutTab() {
  const t = useTranslations('apps.presencetracker');

  return (
    <div className="space-y-6">
      {/* Positioning line */}
      <p className="text-label text-[14.5px] leading-relaxed font-medium">{t('positioning')}</p>

      {/* Physical presence explainer */}
      <div className="pt-6 border-t border-border">
        <p className="section-label mb-3">{t('explainer.title')}</p>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex-1 space-y-3 text-[14px] text-label leading-relaxed">
            <p>
              {t.rich('explainer.p1', {
                ircc: t('irccRule'),
                citCit: (chunks) => (
                  <a
                    href={t('irccCitizenshipUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-brand-blue no-underline border-b border-dotted border-brand-blue/50 whitespace-nowrap"
                  >
                    {chunks}
                  </a>
                ),
                citPr: (chunks) => (
                  <a
                    href={t('irccPrUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-brand-blue no-underline border-b border-dotted border-brand-blue/50 whitespace-nowrap"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p>{t('explainer.p2')}</p>
            <p className="text-[12px] text-muted">*{t('explainer.p3')}</p>
          </div>
          <div className={SCREENSHOT_FRAME}>
            <Image
              src="/images/presencetracker-screenshot-progress.png"
              alt={t('explainer.title')}
              width={1320}
              height={2868}
              className={SCREENSHOT_IMG}
            />
          </div>
        </div>
      </div>

      <WhatsNewSection />
      <EverythingItDoesSection />
      <TrustSection />
      <PricingSection />
      <DisclaimerBox />
    </div>
  );
}


export function PresenceTrackerTabs() {
  const [active, setActive] = useState<'about' | 'privacy'>('about');
  const t = useTranslations('apps.presencetracker');
  const tPrivacy = useTranslations('privacy');

  const tabs = [
    { key: 'about' as const,   label: t('tabAbout') },
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
      {active === 'privacy' && <PrivacyPolicyBody />}
    </div>
  );
}
