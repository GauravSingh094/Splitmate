'use client';

import { MotionConfig } from 'framer-motion';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/**
 * MotionProvider — configures Framer Motion globally.
 *
 * Sets `reducedMotion="user"` so all motion components automatically
 * respect the user's OS-level prefers-reduced-motion setting.
 *
 * This provider should be near the top of the tree so that all
 * animated components inherit its configuration.
 */
export function MotionProvider({ children }: { readonly children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <MotionConfig
      reducedMotion={reducedMotion ? 'always' : 'never'}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
