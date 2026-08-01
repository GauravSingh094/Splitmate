import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { UserRepository } from '@/features/users/repository';
import type { UpdateUserInput } from '@/features/users/schemas/user.schema';
import { toast } from '@/lib/toast';

/**
 * Hook to fetch the currently authenticated user (GET /users/me).
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.users.me(),
    queryFn: () => UserRepository.getCurrentUser(),
  });
}

/**
 * Mutation to update the current user's profile (PATCH /users/me).
 */
export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserInput) => UserRepository.updateCurrentUser(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.me() });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update profile');
    },
  });
}
