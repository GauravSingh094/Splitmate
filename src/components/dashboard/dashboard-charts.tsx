'use client';

import { AreaChart } from '@/components/charts/area-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { getCurrencySymbol } from '@/constants/currencies';
import { useUserAnalytics } from '@/features/analytics/queries';
import { fillMissingMonths } from '@/features/analytics/schemas/analytics.schema';
import { useSession } from '@/lib/context/session-context';

export function DashboardCharts() {
  const { user } = useSession();
  const symbol = getCurrencySymbol(user?.preferred_currency || 'INR');
  const { data: analytics, isLoading } = useUserAnalytics();

  const monthlySpending = analytics
    ? fillMissingMonths(analytics.monthly_spending).map((m) => ({
        month: m.month_label,
        amount: parseFloat(m.total_amount),
        expenses: m.expense_count,
      }))
    : [];

  const groupBreakdown =
    analytics?.groups.map((g) => ({
      group: g.group_name,
      amount: parseFloat(g.total_spent),
    })) ?? [];

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      <AreaChart
        title="Monthly Spending Trajectory"
        description="Your total expense contributions over time"
        data={monthlySpending}
        xAxisKey="month"
        series={[{ key: 'amount', name: `Total Spent (${symbol})`, color: 'var(--primary)' }]}
        height={280}
        isLoading={isLoading}
        isEmpty={monthlySpending.every((d) => d.amount === 0)}
      />

      <BarChart
        title="Spending by Group"
        description="Total expenses across your active groups"
        data={groupBreakdown}
        xAxisKey="group"
        series={[{ key: 'amount', name: `Amount (${symbol})`, color: 'var(--accent)' }]}
        height={280}
        isLoading={isLoading}
        isEmpty={groupBreakdown.length === 0}
      />
    </div>
  );
}
