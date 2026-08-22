'use client';

import { useTranslations } from 'next-intl';

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-t border-border">
      <p className="section-label mb-3">{title}</p>
      <div className="space-y-3 text-[14px] text-label leading-relaxed">{children}</div>
    </div>
  );
}

type PrivacySection = { title: string; paragraphs: string[]; items?: string[]; closing?: string };

export function PrivacyPolicyBody() {
  const t = useTranslations('privacy');
  const sections = t.raw('sections') as PrivacySection[];
  const mainSections = sections.slice(0, -1);
  const contactSection = sections[sections.length - 1];

  return (
    <div>
      <div className="card-gradient border border-border rounded-2xl px-6 py-5 mb-2 text-[14px] text-label leading-relaxed">
        <strong className="text-copy font-semibold">{t('summaryLabel')}</strong>{' '}
        {t('summaryText')}
      </div>

      {mainSections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {section.items && (
            <ul className="mt-3 space-y-1">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-muted mt-0.5 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {section.closing && <p className="mt-3">{section.closing}</p>}
        </Section>
      ))}

      <Section title={contactSection.title}>
        <p>
          {contactSection.paragraphs[0]}{' '}
          <a href="mailto:compliance@appdevcanada.ca" className="text-accent hover:underline">
            compliance@appdevcanada.ca
          </a>.
        </p>
      </Section>
    </div>
  );
}
