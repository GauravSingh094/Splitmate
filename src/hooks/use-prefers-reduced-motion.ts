'use client';

import { useMediaQuery } from './use-media-query';

/**
 * Returns true if the user has requested reduced motion via their OS settings.
 * Use this to disable or simplify animations for accessibility.
 *
 * Prefer using Framer Motion's `useReducedMotion()` inside animated components.
 * Use this hook for conditional logic outside of Framer Motion contexts.
 *
 * @example
 * const reducedMotion = usePrefersReducedMotion();
 * const duration = reducedMotion ? 0 : 0.3;
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
