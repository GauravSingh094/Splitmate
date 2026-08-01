import { useQuery } from '@tanstack/react-query';

import { AnalyticsRepository } from '@/features/analytics/repository';

const ANALYTICS_QUERY_KEY = {
  groupAnalytics: (groupId: string) => ['analytics', 'group', groupId] as const,
  userAnalytics: () => ['analytics', 'user'] as const,
};

/**
 * Hook to fetch full analytics for a specific group.
 * GET /groups/{group_id}/analytics
 */
export function useGroupAnalytics(groupId: string) {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEY.groupAnalytics(groupId),
    queryFn: () => AnalyticsRepository.getGroupAnalytics(groupId),
    enabled: Boolean(groupId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch cross-group analytics for the current user.
 * GET /users/me/analytics
 */
export function useUserAnalytics() {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEY.userAnalytics(),
    queryFn: () => AnalyticsRepository.getUserAnalytics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
