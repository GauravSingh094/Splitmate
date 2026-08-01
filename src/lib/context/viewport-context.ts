import { createContext, useContext } from 'react';

import type { ViewportDimensions } from '@/types/ui';

const DEFAULT_VIEWPORT: ViewportDimensions = {
  width: 0,
  height: 0,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
};

export const ViewportContext = createContext<ViewportDimensions>(DEFAULT_VIEWPORT);
ViewportContext.displayName = 'ViewportContext';

/**
 * Access viewport dimensions and responsive breakpoint flags.
 * Prefer this hook over calling useViewport() in deeply nested components
 * to avoid duplicate resize listeners.
 *
 * @example
 * const { isMobile, width } = useViewportContext();
 */
export function useViewportContext(): ViewportDimensions {
  return useContext(ViewportContext);
}
