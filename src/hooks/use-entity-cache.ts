'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { EntityCacheManager } from '@/lib/cache/entity-cache';
import { warmSessionCache } from '@/lib/cache/prefetch-strategy';

export function useEntityCache() {
  const queryClient = useQueryClient();

  const cacheManager = useMemo(() => new EntityCacheManager(queryClient), [queryClient]);

  return {
    queryClient,
    cacheManager,
    warmCache: () => warmSessionCache(queryClient),
  };
}
