import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaApple } from 'react-icons/fa6';
import { ImAndroid } from 'react-icons/im';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/Nav';
import { ContactReveal } from '@/components/ContactReveal';
import { ContactToggleButton } from '@/components/ContactToggleButton';
import type { Metadata } from 'next';
import { localizedAlternates } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localizedAlternates(locale, '') };
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Background photo */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden="true"
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Tri-colour gradient glow on top of photo */}
      <div className="absolute inset-0"
        style={{background: 'radial-gradient(ellipse at 50% 10%, rgba(194,32,24,0.35) 0%, transparent 50%), radial-gradient(ellipse at 15% 90%, rgba(26,138,68,0.25) 0%, transparent 45%), radial-gradient(ellipse at 85% 90%, rgba(21,87,192,0.25) 0%, transparent 45%)'}} />
      {/* Fade to bg at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />

      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <h1 className="sr-only">App Dev Canada</h1>
        <div className="bg-white/50 backdrop-blur-sm rounded-[28px] p-5 shadow-2xl">
          <Image src="/images/logo.png" alt="App Dev Canada logo" width={220} height={220} className="rounded-xl" />
        </div>
        <p className="text-white/85 text-lg sm:text-xl font-medium max-w-md leading-snug drop-shadow mt-2">{t('tagline')}</p>
      </div>
    </section>
  );
}

/* ─── Stats strip (full-width) ──────────────────────────────────────────── */
function StatsStrip() {
  const t = useTranslations('stats');
  const stats = [
    { value: '10+',  label: t('expLabel'),       numClass: 'text-accent' },
    { value: '2',    label: t('countriesLabel'), numClass: 'text-brand-green' },
    { value: '100%', label: t('indieLabel'),     numClass: 'text-brand-blue' },
  ];
  return (
    <div className="stats-strip py-10 px-6" aria-label="Company highlights">
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
        {stats.map(({ value, label, numClass }) => (
          <div key={label}>
            <p className={`text-4xl sm:text-5xl font-black tracking-tight leading-none ${numClass}`}>{value}</p>
            <p className="text-[12px] sm:text-[13px] text-muted mt-2 leading-snug">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Our Approach (values) ─────────────────────────────────────────────── */
function ApproachSection() {
  const t = useTranslations('approach');
  const cards = [
    { key: 'focused',  num: '01', numClass: 'text-accent',      card: 'card-red   border border-accent/25' },
    { key: 'polished', num: '02', numClass: 'text-brand-green', card: 'card-green border border-brand-green/25' },
    { key: 'honest',   num: '03', numClass: 'text-brand-blue',  card: 'card-blue  border border-brand-blue/25' },
  ];
  return (
    <section className="pt-10 pb-4" aria-labelledby="approach-label">
      <p id="approach-label" className="section-label">{t('label')}</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ key, num, numClass, card }) => (
          <div key={key} className={`rounded-2xl p-5 ${card}`}>
            <p className={`text-2xl font-black mb-3 ${numClass}`}>{num}</p>
            <p className="font-semibold text-copy text-sm mb-1">
              {t(`${key}.title` as `focused.title` | `polished.title` | `honest.title`)}
            </p>
            <p className="text-label text-[13px] leading-relaxed">
              {t(`${key}.desc` as `focused.desc` | `polished.desc` | `honest.desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─────────────────────────────────────────────────────── */
function WhyChooseSection() {
  const t = useTranslations('whychoose');
  const reasons = [
    { key: 'reason1', iconClass: 'text-accent bg-accent/10' },
    { key: 'reason2', iconClass: 'text-brand-green bg-brand-green/10' },
    { key: 'reason3', iconClass: 'text-brand-blue bg-brand-blue/10' },
  ];
  return (
    <section className="py-8 border-t border-border" aria-labelledby="whychoose-label">
      {/* 2-col: text left, image right — both stretch to the same height */}
      <div className="flex flex-col sm:flex-row gap-8 items-stretch mb-8">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p id="whychoose-label" className="section-label">{t('label')}</p>
            <h2 className="text-copy text-xl font-bold mt-2 mb-4">{t('title')}</h2>
            <p className="text-label text-[14px] leading-relaxed whitespace-pre-line">{t('text')}</p>
          </div>
        </div>
        <div className="w-full sm:w-[42%] flex-shrink-0 rounded-2xl overflow-hidden">
          <Image
            src="/images/partnership.jpg"
            alt="Partnership and trust"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* 3-col reason cards below */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {reasons.map(({ key, iconClass }) => (
          <div key={key} className="bg-surface border border-border rounded-2xl p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black mb-3 ${iconClass}`}>✓</div>
            <p className="font-semibold text-copy text-sm mb-1">
              {t(`${key}Title` as 'reason1Title' | 'reason2Title' | 'reason3Title')}
            </p>
            <p className="text-label text-[13px] leading-relaxed">
              {t(`${key}Text` as 'reason1Text' | 'reason2Text' | 'reason3Text')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Our Apps (two vertical cards) ─────────────────────────────────────── */
function AppsSection() {
  const t = useTranslations('apps');
  const features = [t('presencetracker.feature1'), t('presencetracker.feature2'), t('presencetracker.feature3'), t('presencetracker.feature4')];

  return (
    <section className="py-8 border-t border-border" aria-labelledby="apps-label">
      <p id="apps-label" className="section-label">{t('label')}</p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* PresenceTracker */}
        <Link
          href="/presencetracker_details"
          className="group flex flex-col card-gradient border border-border rounded-2xl p-6 hover:border-accent/35 transition-colors duration-150"
          aria-label={`${t('presencetracker.name')} — learn more`}
        >
          <div className="flex items-start justify-between mb-4">
            <Image src="/images/presencetracker-icon.svg" alt="PresenceTracker icon" width={72} height={72} unoptimized className="rounded-[14px]" />
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-white" aria-label="Available on iOS · Android coming soon">
              <FaApple size={18} aria-hidden="true" />
              <ImAndroid size={18} className="opacity-40" aria-hidden="true" />
            </span>
          </div>
          <h3 className="font-bold text-copy text-base leading-tight">{t('presencetracker.name')}</h3>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted mt-1 mb-3">{t('presencetracker.category')}</p>
          <p className="text-label text-[13.5px] leading-relaxed mb-4 flex-1">{t('presencetracker.desc')}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {features.map((f) => (
              <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-brand-green/10 text-brand-green border border-brand-green/20">
                <span aria-hidden>✓</span> {f}
              </span>
            ))}
          </div>
        </Link>

        {/* Coming soon */}
        <div className="flex flex-col card-blue border border-brand-blue/25 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-[14px] bg-brand-blue/15 border border-brand-blue/20 flex items-center justify-center">
              <span className="text-brand-blue text-2xl font-black leading-none">+</span>
            </div>
          </div>
          <h3 className="font-bold text-copy text-base leading-tight">{t('comingsoon.title')}</h3>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted mt-1 mb-3">{t('comingsoon.category')}</p>
          <p className="text-label text-[13.5px] leading-relaxed flex-1">{t('comingsoon.text')}</p>
          <div className="flex justify-end mt-4">
            <span className="text-brand-blue text-[13px] font-semibold">{t('comingsoon.cta')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── CTA strip (full-width) ────────────────────────────────────────────── */
function CtaStrip() {
  const t = useTranslations('cta');
  return (
    <div className="hero-gradient border-y border-border py-16 px-6 text-center">
      <h2 className="text-copy text-2xl sm:text-3xl font-bold mb-3">{t('title')}</h2>
      <p className="text-label text-[15px] max-w-lg mx-auto mb-7">{t('text')}</p>
      <ContactToggleButton className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-accent text-white font-semibold text-[14px] hover:bg-accent/85 transition-colors duration-150">
        {t('button')}
      </ContactToggleButton>
    </div>
  );
}

/* ─── The Studio / About (merged 2-column) ──────────────────────────────── */
function StudioSection() {
  const t = useTranslations('team');
  return (
    <section className="py-8 border-t border-border" aria-labelledby="studio-label">
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div className="flex-1 order-2 sm:order-1">
          <p id="studio-label" className="section-label">{t('label')}</p>
          <h2 className="text-copy text-xl font-bold mt-2 mb-4">{t('title')}</h2>
          <p className="text-label text-[14.5px] leading-relaxed whitespace-pre-line">{t('text')}</p>
          <ContactToggleButton className="group inline-flex items-center gap-2 mt-6 text-[13.5px] text-label hover:text-copy transition-colors duration-150">
            <span className="w-2 h-2 rounded-full bg-brand-green" aria-hidden />
            Let's get started
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </ContactToggleButton>
        </div>
        <div className="w-full sm:w-[42%] flex-shrink-0 rounded-2xl overflow-hidden order-1 sm:order-2">
          <Image
            src="/images/team.jpg"
            alt="The App Dev Canada team at work"
            width={500}
            height={360}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
function SiteFooter() {
  const t = useTranslations('footer');
  return (
    <footer className="flex flex-col gap-3 pt-6 pb-10 border-t border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-muted text-[12.5px]">{t('copy')}</span>
        <nav className="flex gap-5" aria-label="Footer links">
          <Link href="/privacy" className="text-[12.5px] text-muted hover:text-label transition-colors duration-150">
            {t('privacy')}
          </Link>
          <a href="mailto:support@appdevcanada.ca" className="text-[12.5px] text-muted hover:text-label transition-colors duration-150">
            {t('support')}
          </a>
        </nav>
      </div>
      <p className="text-[11px] text-muted/60">
        Images by{' '}
        <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-muted transition-colors duration-150">Freepik</a>
        {' '}and{' '}
        <a href="https://www.rawpixel.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-muted transition-colors duration-150">Rawpixel</a>
        {' '}— Magnific.com
      </p>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsStrip />
      <main>
        <div className="max-w-3xl mx-auto px-6">
          <ApproachSection />
          <WhyChooseSection />
          <AppsSection />
          <StudioSection />
        </div>
        <CtaStrip />
        <div className="max-w-3xl mx-auto px-6">
          <ContactReveal />
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
