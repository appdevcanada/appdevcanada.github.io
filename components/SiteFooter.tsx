import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function SiteFooter({ attribution }: { attribution?: React.ReactNode }) {
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
      {attribution && <p className="text-[11px] text-muted">{attribution}</p>}
    </footer>
  );
}
