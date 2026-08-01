'use client';

import { useEffect, useState } from 'react';

/**
 * Returns `true` only after the component has mounted on the client.
 * Use this to safely render client-only content without hydration mismatches.
 *
 * @example
 * const mounted = useMounted();
 * if (!mounted) return null; // avoid SSR rendering
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This is the canonical pattern for tracking mount state.
    // The lint rule flags this, but this is an intentional use of
    // setState in an effect to track component lifecycle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}
