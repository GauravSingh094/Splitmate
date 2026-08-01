import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { BalanceRepository } from '@/features/balances/repository';

/**
 * Hook to fetch pairwise balances for a specific group.
 */
export function useGroupBalances(groupId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.balances.byGroup(groupId),
    queryFn: () => BalanceRepository.getGroupBalance(groupId),
    enabled: Boolean(groupId),
  });
}

/**
 * Hook to fetch simplified (minimized transactions) balances for a group.
 */
export function useSimplifiedBalances(groupId: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.balances.byGroup(groupId), 'simplified'],
    queryFn: () => BalanceRepository.getSimplifiedBalance(groupId),
    enabled: Boolean(groupId),
  });
}

/**
 * Hook to fetch the current user's overall balance summary across all groups.
 */
export function useOverallBalances() {
  return useQuery({
    queryKey: QUERY_KEYS.balances.summary(),
    queryFn: () => BalanceRepository.getOverallBalances(),
  });
}
