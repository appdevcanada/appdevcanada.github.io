'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';

const LOCALES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'es', label: 'ES', full: 'Español' },
  { code: 'pt', label: 'PT', full: 'Português' },
  { code: 'zh', label: '中文', full: '中文' },
] as const;

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  function switchLocale(code: string) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  }

  /* Close on outside click */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="
          inline-flex items-center gap-1.5 px-2.5 h-8 rounded-lg
          text-xs font-bold tracking-wide
          text-accent bg-accent/10 border border-accent/20
          hover:bg-accent/18 hover:border-accent/35
          transition-colors duration-150
        "
      >
        {current.label}
        <svg width="9" height="5" viewBox="0 0 9 5" fill="none" aria-hidden="true" className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1L4.5 4L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="
            absolute right-0 top-full mt-1.5 z-50
            bg-surface border border-border rounded-lg overflow-hidden
            shadow-[0_8px_24px_rgba(0,0,0,0.25)]
            min-w-[100px]
          "
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === locale}
              onClick={() => switchLocale(l.code)}
              className={`
                block w-full text-left px-3.5 py-2.5
                text-sm font-medium
                transition-colors duration-100
                ${l.code === locale
                  ? 'text-accent font-bold'
                  : 'text-label hover:bg-surface2 hover:text-copy'
                }
              `}
            >
              {l.full}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
