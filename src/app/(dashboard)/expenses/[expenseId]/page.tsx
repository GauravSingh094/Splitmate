'use client';

import { use } from 'react';
import { ArrowLeft, CreditCard, Receipt, RotateCcw, User } from 'lucide-react';
import Link from 'next/link';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { CardSkeleton } from '@/components/feedback/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useExpenseDetail, useReverseExpense } from '@/features/expenses/queries';
import { useGroupDetail } from '@/features/groups/queries';

export default function SingleExpenseDetailPage({
  params,
}: {
  params: Promise<{ expenseId: string }>;
}) {
  const { expenseId } = use(params);

  const { data: expense, isLoading, error } = useExpenseDetail(expenseId);
  const groupId = expense?.group_id || '';
  const { data: group } = useGroupDetail(groupId);
  const reverseMutation = useReverseExpense(groupId);

  const handleReverse = async () => {
    if (!expense) return;
    if (
      !confirm(
        `Are you sure you want to reverse "${expense.title}"?\nThis will undo all balance calculations for this expense.`,
      )
    )
      return;
    await reverseMutation.mutateAsync(expense.id);
  };

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col gap-1">
            <Link
              href={groupId ? ROUTES.dashboard.groupExpenses(groupId) : ROUTES.dashboard.expenses}
              className="flex w-fit items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon icon={ArrowLeft} size={14} />
              {group?.name ? `Back to ${group.name} Expenses` : 'Back to Expenses'}
            </Link>
            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {expense?.title ?? 'Expense Detail'}
                </h1>
                {expense && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Recorded on {new Date(expense.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              {expense && expense.status === 'active' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReverse}
                  isLoading={reverseMutation.isPending}
                  leftIcon={<Icon icon={RotateCcw} size={16} />}
                >
                  Reverse Expense
                </Button>
              )}
            </div>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection className="mx-auto w-full max-w-xl">
            {isLoading ? (
              <CardSkeleton />
            ) : error || !expense ? (
              <Card variant="surface" className="space-y-4 border-border p-8 text-center">
                <Icon icon={Receipt} size={32} className="mx-auto text-muted-foreground" />
                <h3 className="text-base font-bold text-foreground">Expense Not Found</h3>
                <p className="text-xs text-muted-foreground">
                  The requested expense could not be loaded or may have been deleted.
                </p>
                <Link href={ROUTES.dashboard.expenses}>
                  <Button variant="primary" size="sm">
                    Back to Expenses
                  </Button>
                </Link>
              </Card>
            ) : (
              <Card variant="raised" className="space-y-6 border-border p-6 shadow-neo-2">
                {/* Main details header */}
                <div className="flex items-start justify-between border-b border-border/40 pb-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Total Expense Amount</span>
                    <p className="mt-0.5 text-3xl font-extrabold tracking-tight text-foreground">
                      {expense.currency} {parseFloat(expense.total_amount).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" size="md">
                      {expense.split_type}
                    </Badge>
                    <Badge
                      variant={expense.status === 'active' ? 'success' : 'secondary'}
                      size="md"
                    >
                      {expense.status}
                    </Badge>
                  </div>
                </div>

                {/* Description if present */}
                {expense.description && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground">Description</span>
                    <p className="mt-1 rounded-xl border border-border/60 bg-surface p-3 text-sm leading-relaxed text-foreground">
                      {expense.description}
                    </p>
                  </div>
                )}

                {/* Paid By info */}
                <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                    <Icon icon={User} size={18} />
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground">Paid By</span>
                    <p className="text-sm font-bold text-foreground">{expense.paid_by_name}</p>
                  </div>
                </div>

                {/* Participant breakdown */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      Participants & Owed Amounts
                    </span>
                    <Badge variant="outline" size="sm">
                      {expense.participants.length} member
                      {expense.participants.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {expense.participants.map((p) => (
                      <div
                        key={p.user_id}
                        className="flex items-center justify-between rounded-lg border border-border/50 bg-surface p-3"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-2xs flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-foreground">{p.name}</span>
                        </div>
                        <span className="text-destructive text-sm font-bold">
                          {expense.currency} {parseFloat(p.owed_amount).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer link to group */}
                {groupId && (
                  <div className="border-t border-border/40 pt-4 text-center">
                    <Link
                      href={ROUTES.dashboard.group(groupId)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <Icon icon={CreditCard} size={14} />
                      View Full Group Ledger
                    </Link>
                  </div>
                )}
              </Card>
            )}
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
