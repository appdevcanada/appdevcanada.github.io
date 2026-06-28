'use client';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function ContactToggleButton({ className, children }: Props) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent('open-contact'));
  }
  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
