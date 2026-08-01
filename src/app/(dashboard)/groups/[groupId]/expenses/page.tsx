'use client';

import { ArrowLeft, Plus, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

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
import { useGroupExpenses, useReverseExpense } from '@/features/expenses/queries';
import { useGroupDetail } from '@/features/groups/queries';

export default function GroupExpensesPage() {
  const params = useParams<{ groupId: string }>();
  const groupId = params.groupId;

  const { data: group } = useGroupDetail(groupId);
  const { data: expenses, isLoading } = useGroupExpenses(groupId);
  const reverseExpenseMutation = useReverseExpense(groupId);

  const [reversingId, setReversingId] = useState<string | null>(null);

  const expensesList = Array.isArray(expenses)
    ? expenses
    : ((expenses as unknown as { items?: typeof expenses })?.items ?? []);

  const handleReverse = async (expenseId: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to reverse "${title}"?\n\nThis will undo all balance changes for this expense. This action cannot be undone.`,
      )
    )
      return;
    setReversingId(expenseId);
    try {
      await reverseExpenseMutation.mutateAsync(expenseId);
    } finally {
      setReversingId(null);
    }
  };

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
            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Expenses</h1>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  All expenses in {group?.name ?? 'this group'}
                </p>
              </div>
              <Link href={ROUTES.dashboard.newExpense(groupId)}>
                <Button variant="primary" leftIcon={<Icon icon={Plus} size={18} />}>
                  Add Expense
                </Button>
              </Link>
            </div>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection>
            {isLoading ? (
              <div className="space-y-3">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : !expensesList || expensesList.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 py-16 text-center shadow-neo-1">
                <h3 className="text-base font-semibold text-foreground">No expenses yet</h3>
                <p className="max-w-sm text-xs text-muted-foreground">
                  Add your first expense to start tracking shared costs in this group.
                </p>
                <Link href={ROUTES.dashboard.newExpense(groupId)}>
                  <Button variant="primary" size="sm" leftIcon={<Icon icon={Plus} size={16} />}>
                    Add First Expense
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {expensesList.map((exp) => (
                  <Card
                    key={exp.id}
                    variant="raised"
                    className={`flex items-center justify-between gap-4 border-border p-4 shadow-neo-1 ${
                      exp.status === 'reversed' ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <Badge variant="secondary" size="sm">
                          {exp.split_type}
                        </Badge>
                        <Badge
                          variant={exp.status === 'active' ? 'success' : 'secondary'}
                          size="sm"
                        >
                          {exp.status}
                        </Badge>
                      </div>
                      {exp.description && (
                        <p className="text-2xs mt-0.5 truncate text-muted-foreground">
                          {exp.description}
                        </p>
                      )}
                      <p className="text-2xs mt-1 text-muted-foreground">
                        Paid by{' '}
                        <span className="font-medium text-foreground">{exp.paid_by_name}</span>
                        {' · '}
                        {new Date(exp.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <div className="text-right">
                        <p className="text-base font-extrabold text-foreground">
                          {exp.currency} {parseFloat(exp.total_amount).toFixed(2)}
                        </p>
                        <p className="text-2xs text-muted-foreground">
                          {exp.participants.length} participant
                          {exp.participants.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      {exp.status === 'active' && (
                        <button
                          onClick={() => handleReverse(exp.id, exp.title)}
                          disabled={reversingId === exp.id}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-warning/10 hover:text-warning disabled:opacity-50"
                          title="Reverse expense"
                          aria-label="Reverse expense"
                        >
                          <Icon icon={RotateCcw} size={16} />
                        </button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
