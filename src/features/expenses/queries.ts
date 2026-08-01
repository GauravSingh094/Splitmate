import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { ExpenseRepository } from '@/features/expenses/repository';
import type {
  CreateExpenseInput,
  UpdateExpenseInput,
} from '@/features/expenses/schemas/expense.schema';
import { EntityCacheManager } from '@/lib/cache/entity-cache';
import { toast } from '@/lib/toast';

/**
 * Hook to fetch expenses for a specific group (GET /groups/{id}/expenses).
 */
export function useGroupExpenses(groupId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.expenses.list({ groupId }),
    queryFn: () => ExpenseRepository.getGroupExpenses(groupId),
    enabled: Boolean(groupId),
  });
}

/**
 * Hook to fetch single expense detail (GET /expenses/{id}).
 */
export function useExpenseDetail(expenseId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.expenses.detail(expenseId),
    queryFn: () => ExpenseRepository.getExpenseById(expenseId),
    enabled: Boolean(expenseId),
  });
}

/**
 * Mutation to create an expense with automatic idempotency key.
 * Idempotency key is generated once per hook mount (not on submit).
 */
export function useCreateExpense(groupId: string) {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (data: CreateExpenseInput) => {
      const idempotencyKey =
        typeof globalThis.crypto?.randomUUID === 'function'
          ? globalThis.crypto.randomUUID()
          : `exp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      return ExpenseRepository.createExpense(groupId, data, idempotencyKey);
    },
    onSuccess: () => {
      toast.success('Expense recorded successfully');
      cacheManager.invalidateExpenses(groupId);
      cacheManager.invalidateBalances(groupId);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to record expense');
    },
  });
}

/**
 * Mutation to update expense title/description (PATCH /expenses/{id}).
 * Amounts and splits are immutable — use reverse + recreate for that.
 */
export function useUpdateExpense(groupId: string, expenseId: string) {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (data: UpdateExpenseInput) => ExpenseRepository.updateExpense(expenseId, data),
    onSuccess: () => {
      toast.success('Expense updated');
      cacheManager.invalidateExpenses(groupId);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenses.detail(expenseId) });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update expense');
    },
  });
}

/**
 * Mutation to reverse (soft-delete) an expense (PATCH /expenses/{id}/reverse).
 * There is NO DELETE endpoint — reversing undoes all balance changes.
 */
export function useReverseExpense(groupId: string) {
  const queryClient = useQueryClient();
  const cacheManager = new EntityCacheManager(queryClient);

  return useMutation({
    mutationFn: (expenseId: string) => ExpenseRepository.reverseExpense(expenseId),
    onSuccess: () => {
      toast.success('Expense reversed successfully');
      cacheManager.invalidateExpenses(groupId);
      cacheManager.invalidateBalances(groupId);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to reverse expense');
    },
  });
}
