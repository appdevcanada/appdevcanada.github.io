'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { LangSwitcher } from './LangSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setShowLogo(window.scrollY > window.innerHeight * 0.35);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Site navigation"
      className="
        sticky top-0 z-50
        flex items-center justify-between gap-2
        px-6 py-2.5
        bg-bg/80 backdrop-blur-md
        border-b border-border
      "
    >
      <Link
        href="/"
        aria-label="App Dev Canada — home"
        className={`
          flex items-center justify-center w-9 h-9 p-1 rounded-[4px]
          bg-white/95 shadow-sm shrink-0
          transition-all duration-300 ease-out
          ${showLogo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 -translate-y-1 pointer-events-none'}
        `}
      >
        <Image src="/images/logo.png" alt="App Dev Canada" width={28} height={28} className="rounded-[2px]" />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LangSwitcher />
      </div>
    </nav>
  );
}
