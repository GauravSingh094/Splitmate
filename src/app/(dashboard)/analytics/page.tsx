'use client';

import {
  BarChart3,
  CircleDollarSign,
  Receipt,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { BarChart } from '@/components/charts/bar-chart';
import { LineChart } from '@/components/charts/line-chart';
import { CardSkeleton } from '@/components/feedback/skeleton';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { Icon } from '@/design-system/components/icon';
import { useOverallBalances } from '@/features/balances/queries';
import { useUserAnalytics } from '@/features/analytics/queries';
import { fillMissingMonths } from '@/features/analytics/schemas/analytics.schema';

function StatCard({
  label,
  value,
  icon,
  trend,
  trendLabel,
  variant = 'default',
}: {
  label: string;
  value: string;
  icon: typeof Wallet;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  variant?: 'default' | 'success' | 'destructive';
}) {
  const trendColor =
    trend === 'up'
      ? 'text-success'
      : trend === 'down'
        ? 'text-destructive'
        : 'text-muted-foreground';

  return (
    <Card variant="raised" className="border-border p-5 shadow-neo-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p
            className={`mt-1 text-2xl font-extrabold tracking-tight ${
              variant === 'success'
                ? 'text-success'
                : variant === 'destructive'
                  ? 'text-destructive'
                  : 'text-foreground'
            }`}
          >
            {value}
          </p>
          {trendLabel && <p className={`text-2xs mt-0.5 ${trendColor}`}>{trendLabel}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon icon={icon} size={20} />
        </div>
      </div>
    </Card>
  );
}

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useUserAnalytics();
  const { data: overallBalances, isLoading: balancesLoading } = useOverallBalances();

  const monthlyData = analytics
    ? fillMissingMonths(analytics.monthly_spending).map((m) => ({
        month: m.month_label,
        amount: parseFloat(m.total_amount),
        expenses: m.expense_count,
      }))
    : [];

  const netBalance = analytics ? parseFloat(analytics.net_balance) : 0;
  const netBalanceLabel =
    netBalance > 0 ? 'you are owed overall' : netBalance < 0 ? 'you owe overall' : 'all settled';

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Financial Analytics
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Your spending insights and balance summary across all groups
            </p>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          {/* KPI Stats */}
          <WorkspaceSection>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard
                  label="Net Balance"
                  value={analytics ? `${Math.abs(netBalance).toFixed(2)}` : '—'}
                  icon={CircleDollarSign}
                  variant={netBalance > 0 ? 'success' : netBalance < 0 ? 'destructive' : 'default'}
                  trendLabel={netBalanceLabel}
                />
                <StatCard
                  label="Total Paid"
                  value={
                    analytics ? `${parseFloat(analytics.total_paid_all_groups).toFixed(2)}` : '—'
                  }
                  icon={Wallet}
                />
                <StatCard
                  label="Active Groups"
                  value={analytics ? `${analytics.total_groups_count}` : '—'}
                  icon={Users}
                />
                <StatCard
                  label="Total Expenses"
                  value={analytics ? `${analytics.total_expense_count}` : '—'}
                  icon={Receipt}
                />
              </div>
            )}
          </WorkspaceSection>

          {/* You owe / Others owe you cards */}
          {analytics && (
            <WorkspaceSection>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card variant="surface" className="border-destructive/30 bg-destructive/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-destructive/10 text-destructive flex h-10 w-10 items-center justify-center rounded-xl">
                      <Icon icon={TrendingDown} size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">You owe</p>
                      <p className="text-destructive text-xl font-extrabold">
                        {parseFloat(analytics.total_owed_to_others).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card variant="surface" className="border-success/30 bg-success/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                      <Icon icon={TrendingUp} size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Owed to you</p>
                      <p className="text-xl font-extrabold text-success">
                        {parseFloat(analytics.total_others_owe_user).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </WorkspaceSection>
          )}

          {/* Monthly Spending Chart */}
          <WorkspaceSection>
            <LineChart
              title="Monthly Spending (Last 12 Months)"
              description="Your total expense contributions per month across all groups"
              data={monthlyData}
              xAxisKey="month"
              series={[{ key: 'amount', name: 'Spending', color: 'var(--primary)' }]}
              isLoading={isLoading}
              isEmpty={monthlyData.every((d) => d.amount === 0)}
              height={280}
            />
          </WorkspaceSection>

          {/* Monthly Expense Count */}
          {monthlyData.some((d) => d.expenses > 0) && (
            <WorkspaceSection>
              <BarChart
                title="Expenses per Month"
                description="Number of expenses recorded per month"
                data={monthlyData}
                xAxisKey="month"
                series={[{ key: 'expenses', name: 'Expenses', color: 'var(--accent)' }]}
                isLoading={isLoading}
                height={220}
              />
            </WorkspaceSection>
          )}

          {/* Group Breakdown */}
          {analytics && analytics.groups.length > 0 && (
            <WorkspaceSection>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Breakdown by Group</h2>
                <Badge variant="secondary" size="sm">
                  {analytics.groups.length} groups
                </Badge>
              </div>
              <div className="space-y-3">
                {analytics.groups.map((g) => (
                  <Card key={g.group_id} variant="surface" className="border-border p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {g.group_name}
                        </p>
                        <p className="text-2xs mt-0.5 text-muted-foreground">
                          {g.expense_count} expense{g.expense_count !== 1 ? 's' : ''} · {g.currency}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-foreground">
                          {parseFloat(g.total_spent).toFixed(2)} total
                        </p>
                        <p className="text-2xs text-muted-foreground">
                          You paid {parseFloat(g.user_paid).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-primary transition-all"
                        style={{
                          width: `${Math.min(100, (parseFloat(g.user_paid) / Math.max(0.01, parseFloat(g.total_spent))) * 100)}%`,
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </WorkspaceSection>
          )}

          {/* Overall Balances */}
          {overallBalances && overallBalances.length > 0 && (
            <WorkspaceSection>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Overall Balances by Person</h2>
              </div>
              {balancesLoading ? (
                <CardSkeleton />
              ) : (
                <div className="space-y-2">
                  {overallBalances.map((b) => {
                    const amount = parseFloat(b.net_amount);
                    const isPositive = amount > 0;
                    return (
                      <Card
                        key={b.counterpart_user_id}
                        variant="surface"
                        className="flex items-center justify-between gap-3 border-border p-3"
                      >
                        <p className="text-sm font-medium text-foreground">{b.counterpart_name}</p>
                        <span
                          className={`text-sm font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}
                        >
                          {isPositive ? '+' : ''}
                          {amount.toFixed(2)} {b.currency}
                        </span>
                      </Card>
                    );
                  })}
                </div>
              )}
            </WorkspaceSection>
          )}

          {/* Empty state */}
          {!isLoading && !analytics && (
            <WorkspaceSection>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 py-16 text-center shadow-neo-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon icon={BarChart3} size={24} />
                </div>
                <h3 className="text-base font-semibold text-foreground">No analytics yet</h3>
                <p className="max-w-sm text-xs text-muted-foreground">
                  Add expenses to groups to start seeing your financial analytics here.
                </p>
              </div>
            </WorkspaceSection>
          )}
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
