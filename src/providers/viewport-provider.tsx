'use client';

import { useMemo } from 'react';

import { useViewport } from '@/hooks/use-viewport';
import { ViewportContext } from '@/lib/context/viewport-context';

/**
 * ViewportProvider — shares a single viewport observer with all consumers.
 *
 * Without this provider, each `useViewport()` call creates its own
 * resize event listener. This provider creates exactly one listener
 * and distributes the result via context.
 *
 * Use `useViewportContext()` in components instead of `useViewport()`
 * for better performance in large component trees.
 */
export function ViewportProvider({ children }: { readonly children: React.ReactNode }) {
  const rawViewport = useViewport();
  // Memoize so consumers only re-render when values actually change.
  const viewport = useMemo(() => rawViewport, [rawViewport]);

  return <ViewportContext.Provider value={viewport}>{children}</ViewportContext.Provider>;
}
