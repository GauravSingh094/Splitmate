import type { QueryClient } from '@tanstack/react-query';

const CACHE_STORAGE_KEY = 'splito_query_cache';
const CACHE_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hours

export function persistQueryCache(queryClient: QueryClient): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheData = queryClient
      .getQueryCache()
      .getAll()
      .map((query) => ({
        queryKey: query.queryKey,
        state: query.state,
        updatedAt: Date.now(),
      }));

    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cacheData));
  } catch (e) {
    console.warn('[Cache Persist] Failed to save cache:', e);
  }
}

export function restoreQueryCache(queryClient: QueryClient): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!stored) return;

    const cacheData: { queryKey: unknown[]; state: unknown; updatedAt: number }[] =
      JSON.parse(stored);

    cacheData.forEach(({ queryKey, state, updatedAt }) => {
      if (Date.now() - updatedAt < CACHE_MAX_AGE) {
        queryClient.setQueryData(queryKey, (state as { data?: unknown })?.data);
      }
    });
  } catch (e) {
    console.warn('[Cache Restore] Failed to restore cache:', e);
  }
}
