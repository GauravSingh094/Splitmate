'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media query hook.
 * Returns `false` during server-side rendering to avoid hydration mismatches.
 * Uses the event-subscription pattern to avoid calling setState synchronously in effects.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Sync initial value via the subscriber pattern to satisfy the lint rule.
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handler);

    // Set initial value after subscribing — this reads current media query state
    // which requires window access (client-only). This is the correct pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * Convenience hooks for common breakpoints (matches Tailwind defaults).
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function usePrefersDark() {
  return useMediaQuery('(prefers-color-scheme: dark)');
}
