import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { MemberRepository } from '@/features/members/repository';
import type { AddMemberInput } from '@/features/members/schemas/member.schema';
import { EntityCacheManager } from '@/lib/cache/entity-cache';
import { toast } from '@/lib/toast';

/**
 * Custom hook to fetch members of a specific group.
 */
export function useGroupMembers(groupId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.groups.members(groupId),
    queryFn: () => MemberRepository.getMembers(groupId),
    enabled: Boolean(groupId),
  });
}

/**
 * Custom mutation to add a member to a group.
 */
export function useAddMember(groupId: string) {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (data: AddMemberInput) => MemberRepository.addMember(groupId, data),
    onSuccess: () => {
      toast.success('Member added successfully');
      cacheManager.invalidateMembers(groupId);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to add member');
    },
  });
}

/**
 * Custom mutation to remove a member from a group.
 */
export function useRemoveMember(groupId: string) {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (memberId: string) => MemberRepository.removeMember(groupId, memberId),
    onSuccess: () => {
      toast.success('Member removed');
      cacheManager.invalidateMembers(groupId);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to remove member');
    },
  });
}
