import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { GroupRepository } from '@/features/groups/repository';
import type { CreateGroupInput, UpdateGroupInput } from '@/features/groups/schemas/group.schema';
import { EntityCacheManager } from '@/lib/cache/entity-cache';
import { toast } from '@/lib/toast';

/**
 * Hook to fetch the flat list of groups (GET /groups → Group[]).
 */
export function useGroups() {
  return useQuery({
    queryKey: QUERY_KEYS.groups.list(),
    queryFn: () => GroupRepository.getGroups(),
  });
}

/**
 * Hook to fetch full group detail including members (GET /groups/{id}).
 */
export function useGroupDetail(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.groups.detail(id),
    queryFn: () => GroupRepository.getGroupById(id),
    enabled: Boolean(id),
  });
}

/**
 * Mutation to create a new group.
 */
export function useCreateGroup() {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (data: CreateGroupInput) => GroupRepository.createGroup(data),
    onSuccess: () => {
      toast.success('Group created successfully');
      cacheManager.invalidateGroups();
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to create group');
    },
  });
}

/**
 * Mutation to update group name (PATCH /groups/{id}).
 */
export function useUpdateGroup(groupId: string) {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (data: UpdateGroupInput) => GroupRepository.updateGroup(groupId, data),
    onSuccess: () => {
      toast.success('Group updated successfully');
      cacheManager.invalidateGroups(groupId);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update group');
    },
  });
}

/**
 * Mutation to archive a group (PATCH /groups/{id}/archive).
 * Archived groups disappear from GET /groups and are excluded from balances.
 * There is NO delete endpoint.
 */
export function useArchiveGroup() {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (groupId: string) => GroupRepository.archiveGroup(groupId),
    onSuccess: () => {
      toast.success('Group archived successfully');
      cacheManager.invalidateGroups();
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to archive group');
    },
  });
}
