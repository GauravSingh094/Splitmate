import type { QueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { GroupRepository } from '@/features/groups/repository';
import { UserRepository } from '@/features/users/repository';

/**
 * Cache Prefetching & Warming Strategy.
 * Executed upon login or session restoration to warm the cache before rendering views.
 */
export async function warmSessionCache(queryClient: QueryClient): Promise<void> {
  try {
    await Promise.allSettled([
      // 1. Prefetch Current User Profile
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.users.me(),
        queryFn: () => UserRepository.getCurrentUser(),
        staleTime: 1000 * 60 * 10, // 10 mins
      }),

      // 2. Prefetch User Groups
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.groups.list(),
        queryFn: () => GroupRepository.getGroups(),
        staleTime: 1000 * 60 * 5, // 5 mins
      }),
    ]);
  } catch (error) {
    // Fail silently on prefetch errors
    console.warn('[Cache Warming] Non-critical prefetch error:', error);
  }
}
