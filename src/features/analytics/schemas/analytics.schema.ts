import { z } from 'zod';

// ─── Member analytics (inside GroupAnalyticsResponse.members[]) ───────────────
export const memberAnalyticsSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string(),
  total_paid: z.string(),
  total_owed: z.string(),
  net_balance: z.string(),
  expense_count: z.number().int(),
  percentage_of_total: z.string(),
});

// ─── Monthly spending (shared by group & user analytics) ──────────────────────
export const monthlySpendingSchema = z.object({
  year: z.number().int(),
  month: z.number().int(),
  month_label: z.string(),
  total_amount: z.string(),
  expense_count: z.number().int(),
});

// ─── Group analytics response (GET /groups/{id}/analytics) ────────────────────
export const groupAnalyticsSchema = z.object({
  group_id: z.string().uuid(),
  group_name: z.string(),
  currency: z.string(),
  total_expenses_amount: z.string(),
  total_expense_count: z.number().int(),
  total_settlements_amount: z.string(),
  settlement_rate: z.string(),
  average_expense_amount: z.string(),
  largest_expense_amount: z.string(),
  largest_expense_title: z.string().nullable().optional(),
  top_spender_name: z.string().nullable().optional(),
  members: z.array(memberAnalyticsSchema).default([]),
  monthly_spending: z.array(monthlySpendingSchema).default([]),
});

// ─── Group summary inside UserAnalyticsResponse ───────────────────────────────
export const userGroupSummarySchema = z.object({
  group_id: z.string().uuid(),
  group_name: z.string(),
  total_spent: z.string(),
  user_paid: z.string(),
  user_owed: z.string(),
  expense_count: z.number().int(),
  currency: z.string(),
});

// ─── User analytics response (GET /users/me/analytics) ───────────────────────
export const userAnalyticsSchema = z.object({
  user_id: z.string().uuid(),
  user_name: z.string(),
  total_paid_all_groups: z.string(),
  total_owed_to_others: z.string(),
  total_others_owe_user: z.string(),
  net_balance: z.string(),
  total_groups_count: z.number().int(),
  total_expense_count: z.number().int(),
  most_expensive_group_name: z.string().nullable().optional(),
  groups: z.array(userGroupSummarySchema).default([]),
  monthly_spending: z.array(monthlySpendingSchema).default([]),
});

// ─── Derived types ────────────────────────────────────────────────────────────
export type MemberAnalytics = z.infer<typeof memberAnalyticsSchema>;
export type MonthlySpending = z.infer<typeof monthlySpendingSchema>;
export type GroupAnalytics = z.infer<typeof groupAnalyticsSchema>;
export type UserGroupSummary = z.infer<typeof userGroupSummarySchema>;
export type UserAnalytics = z.infer<typeof userAnalyticsSchema>;

// ─── Utility: fill missing months for continuous chart display ────────────────
export function fillMissingMonths(data: MonthlySpending[]): MonthlySpending[] {
  const result: MonthlySpending[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const existing = data.find((d) => d.year === year && d.month === month);
    result.push(
      existing ?? {
        year,
        month,
        month_label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        total_amount: '0.00',
        expense_count: 0,
      },
    );
  }
  return result;
}
