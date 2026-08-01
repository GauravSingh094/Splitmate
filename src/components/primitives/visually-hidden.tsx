import { type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  asChild?: boolean;
}

/**
 * VisuallyHidden — Hides content visually while leaving it accessible to screen readers.
 * Alias / wrapper over SrOnly for standardized accessibility API.
 */
export function VisuallyHidden({ children, className, ...props }: VisuallyHiddenProps) {
  return (
    <span className={cn('sr-only', className)} {...props}>
      {children}
    </span>
  );
}
