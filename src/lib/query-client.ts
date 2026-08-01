import { QueryClient } from '@tanstack/react-query';

import { API_CONFIG } from '@/config/api';

/**
 * Creates a fully configured QueryClient instance.
 *
 * Using a factory function (instead of a singleton) ensures each server-side
 * request gets a fresh client, preventing data leakage between requests.
 * On the client, this is called once and reused across renders.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 1 minute — prevents unnecessary refetches.
        staleTime: 60 * 1000,
        // Cache is retained for 5 minutes after a query becomes unused (Garbage Collection time).
        gcTime: 5 * 60 * 1000,
        // Retry failed queries up to the configured maximum.
        retry: API_CONFIG.retry.maxAttempts,
        retryDelay: (attemptIndex) =>
          Math.min(API_CONFIG.retry.baseDelayMs * 2 ** attemptIndex, 30_000),
        // Do not refetch on window focus in development to reduce noise.
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        // Refetch on reconnect to keep data fresh after offline periods.
        refetchOnReconnect: true,
        // Refetch on mount if stale.
        refetchOnMount: true,
        // Network mode: only execute queries when network is online.
        networkMode: 'online',
        // Suspense readiness option (throwOnError can be configured per query or boundary)
        throwOnError: false,
      },
      mutations: {
        retry: 0,
        networkMode: 'online',
      },
    },
  });
}
