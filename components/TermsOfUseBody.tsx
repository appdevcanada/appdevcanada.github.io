'use client';

import { useTranslations } from 'next-intl';
import { Section } from './PrivacyPolicyBody';

type TermsSection = { title: string; paragraphs: string[]; items?: string[]; closing?: string };

export function TermsOfUseBody() {
  const t = useTranslations('terms');
  const sections = t.raw('sections') as TermsSection[];
  const mainSections = sections.slice(0, -1);
  const contactSection = sections[sections.length - 1];

  return (
    <div>
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
