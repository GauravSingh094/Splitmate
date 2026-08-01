import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * Custom hook returning `false` during SSR and `true` on client hydration/mount.
 * Prevents hydration mismatches using React 19 useSyncExternalStore.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
