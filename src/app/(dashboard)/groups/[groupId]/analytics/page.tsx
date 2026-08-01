'use client';

import {
  ArrowLeft,
  BarChart3,
  CreditCard,
  Receipt,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { BarChart } from '@/components/charts/bar-chart';
import { CardSkeleton } from '@/components/feedback/skeleton';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useGroupAnalytics } from '@/features/analytics/queries';
import { useGroupDetail } from '@/features/groups/queries';
import { fillMissingMonths } from '@/features/analytics/schemas/analytics.schema';

export default function GroupAnalyticsPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = use(params);

  const { data: group } = useGroupDetail(groupId);
  const { data: analytics, isLoading } = useGroupAnalytics(groupId);

  const monthlyData = analytics
    ? fillMissingMonths(analytics.monthly_spending).map((m) => ({
        month: m.month_label,
        amount: parseFloat(m.total_amount),
        expenses: m.expense_count,
      }))
    : [];

  const settlementRate = analytics ? parseFloat(analytics.settlement_rate) : 0;

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col gap-1">
            <Link
              href={ROUTES.dashboard.group(groupId)}
              className="flex w-fit items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon icon={ArrowLeft} size={14} />
              {group?.name ?? 'Group'}
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {group?.name ?? 'Group'} Analytics
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Spending breakdown, member contributions, and settlement rate
              </p>
            </div>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          {isLoading ? (
            <WorkspaceSection>
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
              <CardSkeleton />
            </WorkspaceSection>
          ) : !analytics ? (
            <WorkspaceSection>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 py-16 text-center shadow-neo-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon icon={BarChart3} size={24} />
                </div>
                <h3 className="text-base font-semibold text-foreground">No analytics yet</h3>
                <p className="max-w-sm text-xs text-muted-foreground">
                  Add expenses to this group to start seeing analytics here.
                </p>
              </div>
            </WorkspaceSection>
          ) : (
            <>
              {/* KPI Row */}
              <WorkspaceSection>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Card variant="raised" className="border-border p-4 shadow-neo-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Icon icon={Receipt} size={16} className="text-primary" />
                      <p className="text-2xs text-muted-foreground">Total Spent</p>
                    </div>
                    <p className="text-xl font-extrabold text-foreground">
                      {analytics.currency} {parseFloat(analytics.total_expenses_amount).toFixed(2)}
                    </p>
                    <p className="text-2xs mt-0.5 text-muted-foreground">
                      {analytics.total_expense_count} expense
                      {analytics.total_expense_count !== 1 ? 's' : ''}
                    </p>
                  </Card>

                  <Card variant="raised" className="border-border p-4 shadow-neo-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Icon icon={CreditCard} size={16} className="text-primary" />
                      <p className="text-2xs text-muted-foreground">Settlements</p>
                    </div>
                    <p className="text-xl font-extrabold text-foreground">
                      {analytics.currency}{' '}
                      {parseFloat(analytics.total_settlements_amount).toFixed(2)}
                    </p>
                    <p className="text-2xs mt-0.5 text-muted-foreground">recorded total</p>
                  </Card>

                  <Card variant="raised" className="border-border p-4 shadow-neo-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Icon icon={TrendingUp} size={16} className="text-primary" />
                      <p className="text-2xs text-muted-foreground">Avg. Expense</p>
                    </div>
                    <p className="text-xl font-extrabold text-foreground">
                      {analytics.currency} {parseFloat(analytics.average_expense_amount).toFixed(2)}
                    </p>
                  </Card>

                  <Card variant="raised" className="border-border p-4 shadow-neo-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Icon icon={Users} size={16} className="text-primary" />
                      <p className="text-2xs text-muted-foreground">Settlement Rate</p>
                    </div>
                    <p
                      className={`text-xl font-extrabold ${settlementRate >= 80 ? 'text-success' : settlementRate >= 50 ? 'text-warning' : 'text-destructive'}`}
                    >
                      {settlementRate.toFixed(0)}%
                    </p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                      <div
                        className={`h-1.5 rounded-full transition-all ${settlementRate >= 80 ? 'bg-success' : settlementRate >= 50 ? 'bg-amber-500' : 'bg-destructive'}`}
                        style={{ width: `${Math.min(100, settlementRate)}%` }}
                      />
                    </div>
                  </Card>
                </div>
              </WorkspaceSection>

              {/* Largest Expense */}
              {analytics.largest_expense_title && (
                <WorkspaceSection>
                  <Card variant="surface" className="flex items-center gap-3 border-border p-4">
                    <Icon icon={TrendingDown} size={20} className="shrink-0 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Largest expense</p>
                      <p className="font-semibold text-foreground">
                        {analytics.largest_expense_title} — {analytics.currency}{' '}
                        {parseFloat(analytics.largest_expense_amount).toFixed(2)}
                      </p>
                    </div>
                  </Card>
                </WorkspaceSection>
              )}

              {/* Monthly Chart */}
              <WorkspaceSection>
                <BarChart
                  title="Monthly Spending"
                  description="Total expenses recorded per month in this group"
                  data={monthlyData}
                  xAxisKey="month"
                  series={[{ key: 'amount', name: 'Amount', color: 'var(--primary)' }]}
                  height={260}
                  isEmpty={monthlyData.every((d) => d.amount === 0)}
                />
              </WorkspaceSection>

              {/* Member Contributions */}
              {analytics.members.length > 0 && (
                <WorkspaceSection>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-foreground">Member Contributions</h2>
                    <Badge variant="secondary" size="sm">
                      {analytics.members.length} members
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {analytics.members
                      .sort((a, b) => parseFloat(b.total_paid) - parseFloat(a.total_paid))
                      .map((m) => {
                        const pct = parseFloat(m.percentage_of_total);
                        const netBal = parseFloat(m.net_balance);
                        return (
                          <Card key={m.user_id} variant="surface" className="border-border p-4">
                            <div className="mb-2 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                  {m.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">{m.name}</p>
                                  <p className="text-2xs text-muted-foreground">
                                    {m.expense_count} expense{m.expense_count !== 1 ? 's' : ''}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-foreground">
                                  {analytics.currency} {parseFloat(m.total_paid).toFixed(2)} paid
                                </p>
                                <p
                                  className={`text-2xs font-semibold ${netBal > 0 ? 'text-success' : netBal < 0 ? 'text-destructive' : 'text-muted-foreground'}`}
                                >
                                  {netBal > 0
                                    ? `+${netBal.toFixed(2)} owed to them`
                                    : netBal < 0
                                      ? `${netBal.toFixed(2)} they owe`
                                      : 'settled'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 flex-1 rounded-full bg-muted">
                                <div
                                  className="h-1.5 rounded-full bg-primary transition-all"
                                  style={{ width: `${Math.min(100, pct)}%` }}
                                />
                              </div>
                              <span className="text-2xs w-10 text-right text-muted-foreground">
                                {pct.toFixed(0)}%
                              </span>
                            </div>
                          </Card>
                        );
                      })}
                  </div>
                </WorkspaceSection>
              )}
            </>
          )}
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
