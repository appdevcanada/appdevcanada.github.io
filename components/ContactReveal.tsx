'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export function ContactReveal() {
  const t = useTranslations('contact');
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(false);

  useEffect(() => {
    function handleOpen() {
      const alreadyOpen = isOpenRef.current;

      // 1. Trigger the CSS grid-template-rows expand animation (0fr → 1fr, 500ms).
      setIsOpen(true);
      isOpenRef.current = true;

      // 2. If already open, scroll immediately. Otherwise wait for the expand
      //    animation to finish (520ms) so the section has its full height before
      //    we compute its position via getBoundingClientRect() + window.scrollY.
      //    The -80 offset accounts for the sticky nav bar height.
      const delay = alreadyOpen ? 0 : 520;
      setTimeout(() => {
        if (!sectionRef.current) return;
        const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        nameInputRef.current?.focus();
      }, delay);
    }
    window.addEventListener('open-contact', handleOpen);
    return () => window.removeEventListener('open-contact', handleOpen);
  }, []);

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-label">
      {/* animated wrapper using grid-template-rows trick — no height knowledge needed */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="py-8 border-t border-border">
            <p id="contact-label" className="section-label">{t('label')}</p>
            <h2 className="text-copy text-xl font-bold mt-2 mb-6">{t('title')}</h2>
            <form
              action="https://formspree.io/f/xgojyjdr"
              method="POST"
              className="card-gradient border border-border rounded-2xl p-6 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  ref={nameInputRef}
                  name="name"
                  type="text"
                  placeholder={t('namePlaceholder')}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface2 border border-border text-copy placeholder:text-muted text-[14px] outline-none focus:border-accent/50 transition-colors"
                />
                <input
                  name="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface2 border border-border text-copy placeholder:text-muted text-[14px] outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <textarea
                name="message"
                placeholder={t('messagePlaceholder')}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-surface2 border border-border text-copy placeholder:text-muted text-[14px] outline-none focus:border-accent/50 transition-colors resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-[14px] hover:bg-accent/85 transition-colors duration-150"
                >
                  {t('submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
