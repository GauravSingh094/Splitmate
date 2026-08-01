'use client';

import { useEffect, useState } from 'react';

import type { ViewportDimensions } from '@/types/ui';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

function getViewport(): ViewportDimensions {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, isMobile: false, isTablet: false, isDesktop: false };
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
    isMobile: width < MOBILE_BREAKPOINT,
    isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
    isDesktop: width >= TABLET_BREAKPOINT,
  };
}

/**
 * Returns live viewport dimensions and responsive breakpoint flags.
 * SSR-safe: returns zeros on the server.
 *
 * @example
 * const { width, isMobile, isDesktop } = useViewport();
 */
export function useViewport(): ViewportDimensions {
  const [viewport, setViewport] = useState<ViewportDimensions>(getViewport);

  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      rafId = requestAnimationFrame(() => {
        setViewport(getViewport());
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return viewport;
}
