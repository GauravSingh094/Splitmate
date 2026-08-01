'use client';

import { cn } from '@/lib/utils';

interface SkipNavProps {
  contentId?: string;
  className?: string;
  label?: string;
}

/**
 * SkipNav — Accessibility link allowing keyboard users to jump directly
 * to the main content area, bypassing repeated header/navigation elements.
 */
export function SkipNav({
  contentId = 'main-content',
  className,
  label = 'Skip to main content',
}: SkipNavProps) {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        'sr-only focus:not-sr-only',
        'fixed top-3 left-3 z-[100]',
        'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg',
        'ring-2 ring-ring ring-offset-2 ring-offset-background outline-none',
        'transition-transform duration-200',
        className,
      )}
    >
      {label}
    </a>
  );
}
