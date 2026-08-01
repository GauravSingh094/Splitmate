import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { SettlementRepository } from '@/features/settlements/repository';
import type { CreateSettlementInput } from '@/features/settlements/schemas/settlement.schema';
import { EntityCacheManager } from '@/lib/cache/entity-cache';
import { toast } from '@/lib/toast';

/**
 * Hook to fetch settlements for a specific group (GET /groups/{id}/settlements).
 */
export function useGroupSettlements(groupId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.settlements.list({ groupId }),
    queryFn: () => SettlementRepository.getSettlements(groupId),
    enabled: Boolean(groupId),
  });
}

/**
 * Mutation to record a settlement payment.
 */
export function useCreateSettlement(groupId: string) {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (data: CreateSettlementInput) =>
      SettlementRepository.createSettlement(groupId, data),
    onSuccess: () => {
      toast.success('Settlement payment recorded successfully');
      cacheManager.invalidateBalances(groupId);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.settlements.all() });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to record settlement');
    },
  });
}
