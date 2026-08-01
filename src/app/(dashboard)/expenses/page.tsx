'use client';

import { ArrowRight, Plus, Receipt, Users } from 'lucide-react';
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
import { useGroups } from '@/features/groups/queries';

export default function ExpensesOverviewPage() {
  const { data: groups, isLoading } = useGroups();
  const groupsList = Array.isArray(groups) ? groups : [];

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Expenses Ledger</h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Select a group to view, add, or manage shared expense ledgers
              </p>
            </div>
            {groupsList.length > 0 && groupsList[0] && (
              <Link href={ROUTES.dashboard.newExpense(groupsList[0].id)}>
                <Button variant="primary" leftIcon={<Icon icon={Plus} size={18} />}>
                  Add New Expense
                </Button>
              </Link>
            )}
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection>
            {isLoading ? (
              <div className="space-y-4">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : groupsList.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 py-16 text-center shadow-neo-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-neo-1">
                  <Icon icon={Receipt} size={24} />
                </div>
                <h3 className="text-base font-semibold text-foreground">No expense groups yet</h3>
                <p className="max-w-sm text-xs text-muted-foreground">
                  Create a group first to start tracking shared expenses with friends or roommates.
                </p>
                <Link href={ROUTES.dashboard.groups}>
                  <Button variant="primary" size="sm" leftIcon={<Icon icon={Plus} size={16} />}>
                    Go to Groups
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Your Group Expense Ledgers</h2>
                  <Badge variant="secondary" size="sm">
                    {groupsList.length} groups active
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {groupsList.map((g) => (
                    <Card
                      key={g.id}
                      variant="raised"
                      className="flex flex-col justify-between gap-4 border-border p-5 shadow-neo-2 transition-all hover:border-primary/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                            <Icon icon={Users} size={20} />
                          </div>
                          <div>
                            <h3 className="text-base font-bold tracking-tight text-foreground">
                              {g.name}
                            </h3>
                            <p className="text-2xs mt-0.5 text-muted-foreground">
                              {g.members_count} member{g.members_count !== 1 ? 's' : ''} ·{' '}
                              {g.default_currency}
                            </p>
                          </div>
                        </div>
                        <Badge variant={g.status === 'active' ? 'success' : 'secondary'} size="sm">
                          {g.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/40 pt-3">
                        <Link href={ROUTES.dashboard.newExpense(g.id)}>
                          <Button
                            variant="ghost"
                            size="xs"
                            leftIcon={<Icon icon={Plus} size={14} />}
                          >
                            Add Expense
                          </Button>
                        </Link>
                        <Link href={ROUTES.dashboard.groupExpenses(g.id)}>
                          <Button
                            variant="primary"
                            size="sm"
                            rightIcon={<Icon icon={ArrowRight} size={16} />}
                          >
                            View Expenses
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
