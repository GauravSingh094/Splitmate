import { HttpService } from '@/services/http.service';
import { AppApiError } from '@/lib/api-error';
import type { Expense, CreateExpenseInput, UpdateExpenseInput } from './schemas/expense.schema';

/**
 * ExpenseRepository — matches production API endpoints exactly.
 *
 * GET    /groups/{group_id}/expenses              → PaginatedExpenses ({ items: Expense[] })
 * POST   /groups/{group_id}/expenses              → Expense
 * GET    /expenses/{expense_id}                   → Expense  (top-level, no group prefix)
 * PATCH  /expenses/{expense_id}                   → Expense  (top-level, no group prefix)
 * PATCH  /expenses/{expense_id}/reverse           → Expense (soft-delete — no DELETE endpoint)
 */
export class ExpenseRepository {
  static async getGroupExpenses(
    groupId: string,
    params?: { page?: number; limit?: number },
  ): Promise<Expense[]> {
    const response = await HttpService.get<{ items?: Expense[] } | Expense[]>(
      `/groups/${groupId}/expenses`,
      { params },
    );

    if (Array.isArray(response)) {
      return response;
    }
    if (response && Array.isArray((response as { items?: Expense[] }).items)) {
      return (response as { items: Expense[] }).items;
    }
    return [];
  }

  static async getExpenseById(expenseId: string): Promise<Expense> {
    return HttpService.get<Expense>(`/expenses/${expenseId}`);
  }

  static async createExpense(
    groupId: string,
    data: CreateExpenseInput,
    idempotencyKey?: string,
  ): Promise<Expense> {
    const {
      split_type,
      participants_equal,
      participants_exact,
      participants_percentage,
      participants_share,
      ...rest
    } = data;

    let participantsPayload: Record<string, unknown> = {};

    if (split_type === 'EQUAL') {
      participantsPayload = {
        participants_equal: (participants_equal || []).map((p) => ({
          user_id: p.user_id,
        })),
      };
    } else if (split_type === 'EXACT') {
      participantsPayload = {
        participants_exact: (participants_exact || []).map((p) => ({
          user_id: p.user_id,
          owed_amount: String(p.owed_amount),
        })),
      };
    } else if (split_type === 'PERCENTAGE') {
      participantsPayload = {
        participants_percentage: (participants_percentage || []).map((p) => ({
          user_id: p.user_id,
          percentage: String(p.percentage),
        })),
      };
    } else if (split_type === 'SHARE') {
      const activeShares = (participants_share || [])
        .map((p) => ({
          user_id: p.user_id,
          shares: Math.max(0, parseInt(String(p.shares), 10) || 0),
        }))
        .filter((p) => p.shares > 0);

      if (activeShares.length === 0) {
        throw new AppApiError(
          'At least one member must have 1 or more shares.',
          'VALIDATION_ERROR',
          422,
        );
      }

      participantsPayload = {
        participants_share: activeShares,
      };
    }

    return HttpService.post<Expense>(
      `/groups/${groupId}/expenses`,
      {
        ...rest,
        split_type,
        ...participantsPayload,
        total_amount: String(data.total_amount),
      },
      {
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
      },
    );
  }

  static async updateExpense(expenseId: string, data: UpdateExpenseInput): Promise<Expense> {
    return HttpService.patch<Expense>(`/expenses/${expenseId}`, data);
  }

  static async reverseExpense(expenseId: string): Promise<Expense> {
    return HttpService.patch<Expense>(`/expenses/${expenseId}/reverse`, {});
  }
}
