import type { QueryClient, QueryKey } from '@tanstack/react-query';

export interface OptimisticMutationOptions<TData, TVariables> {
  queryClient: QueryClient;
  queryKey: QueryKey;
  updateFn: (oldData: TData | undefined, variables: TVariables) => TData;
}

/**
 * Helper to construct TanStack Query optimistic update handlers (onMutate, onError, onSettled).
 */
export function createOptimisticMutation<TData, TVariables>({
  queryClient,
  queryKey,
  updateFn,
}: OptimisticMutationOptions<TData, TVariables>) {
  return {
    onMutate: async (variables: TVariables) => {
      // 1. Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // 2. Snapshot previous value
      const previousData = queryClient.getQueryData<TData>(queryKey);

      // 3. Optimistically update cache
      queryClient.setQueryData<TData>(queryKey, (old) => updateFn(old, variables));

      // 4. Return context snapshot for rollback
      return { previousData };
    },

    onError: (_err: unknown, _variables: TVariables, context?: { previousData?: TData }) => {
      // Rollback to previous data on failure
      if (context?.previousData !== undefined) {
        queryClient.setQueryData<TData>(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      // Revalidate entity query after mutation completes
      queryClient.invalidateQueries({ queryKey });
    },
  };
}
