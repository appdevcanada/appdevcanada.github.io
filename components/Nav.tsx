'use client';

import { LangSwitcher } from './LangSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  return (
    <nav
      aria-label="Site navigation"
      className="
        sticky top-0 z-50
        flex items-center justify-end gap-2
        px-6 py-2.5
        bg-bg/80 backdrop-blur-md
        border-b border-border
      "
    >
      <ThemeToggle />
      <LangSwitcher />
    </nav>
  );
}
