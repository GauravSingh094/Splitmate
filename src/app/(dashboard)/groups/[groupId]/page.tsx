'use client';

import { ArrowLeft, BarChart3, CreditCard, Plus, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { CardSkeleton } from '@/components/feedback/skeleton';
import { AddMemberModal } from '@/components/groups/add-member-modal';
import { CreateSettlementModal } from '@/components/settlements/create-settlement-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { formatCurrency, getCurrencySymbol } from '@/constants/currencies';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useGroupBalances } from '@/features/balances/queries';
import { useGroupExpenses } from '@/features/expenses/queries';
import { useGroupDetail } from '@/features/groups/queries';
import { useGroupMembers } from '@/features/members/queries';
import { useSession } from '@/lib/context/session-context';

export default function GroupDetailPage() {
  const params = useParams<{ groupId: string }>();
  const groupId = params.groupId;
  const { user } = useSession();

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isSettleOpen, setIsSettleOpen] = useState(false);

  const { data: group, isLoading: groupLoading } = useGroupDetail(groupId);
  const { data: expenses, isLoading: expensesLoading } = useGroupExpenses(groupId);
  const { data: members } = useGroupMembers(groupId);
  const { data: balances } = useGroupBalances(groupId);

  if (groupLoading) {
    return (
      <ProtectedRoute>
        <Workspace>
          <WorkspaceHeader>
            <div className="h-7 w-48 animate-pulse rounded bg-muted" />
          </WorkspaceHeader>
          <WorkspaceBody>
            <WorkspaceSection>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </WorkspaceSection>
          </WorkspaceBody>
        </Workspace>
      </ProtectedRoute>
    );
  }

  if (!group) {
    return (
      <ProtectedRoute>
        <Workspace>
          <WorkspaceBody>
            <WorkspaceSection>
              <div className="py-16 text-center">
                <p className="text-muted-foreground">Group not found.</p>
                <Link
                  href={ROUTES.dashboard.groups}
                  className="mt-2 block text-sm text-primary hover:underline"
                >
                  Back to Groups
                </Link>
              </div>
            </WorkspaceSection>
          </WorkspaceBody>
        </Workspace>
      </ProtectedRoute>
    );
  }

  const expensesList = Array.isArray(expenses)
    ? expenses
    : ((expenses as unknown as { items?: typeof expenses })?.items ?? []);
  const recentExpenses = Array.isArray(expensesList) ? expensesList.slice(0, 5) : [];

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col gap-1">
            <Link
              href={ROUTES.dashboard.groups}
              className="flex w-fit items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon icon={ArrowLeft} size={14} />
              All Groups
            </Link>
            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                    {group.name}
                  </h1>
                  {/* Member count and currency info under group name */}
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <Icon icon={Users} size={14} className="inline text-primary" />
                      {group.members_count} Members
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-foreground">
                      Currency: {group.default_currency} (
                      {getCurrencySymbol(group.default_currency)})
                    </span>
                    <span>•</span>
                    <Badge variant={group.status === 'active' ? 'success' : 'secondary'} size="sm">
                      {group.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/groups/${groupId}/analytics`}>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Icon icon={BarChart3} size={16} />}
                  >
                    Analytics
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddMemberOpen(true)}
                  leftIcon={<Icon icon={UserPlus} size={16} />}
                >
                  Add Member
                </Button>
                <Link href={ROUTES.dashboard.newExpense(groupId)}>
                  <Button variant="outline" size="sm" leftIcon={<Icon icon={Plus} size={16} />}>
                    Add Expense
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsSettleOpen(true)}
                  leftIcon={<Icon icon={CreditCard} size={16} />}
                >
                  Settle Up
                </Button>
              </div>
            </div>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          {/* Group Balances Breakdown Section (Replaces 4 stat cards) */}
          <WorkspaceSection>
            <Card variant="raised" className="border-border p-6 shadow-neo-2">
              <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <Icon icon={CreditCard} size={20} className="text-primary" />
                  <h2 className="text-base font-bold text-foreground">Group Balances</h2>
                </div>
                <Badge variant="outline" size="sm">
                  {balances?.balances?.length ?? 0} Pending
                </Badge>
              </div>

              {!balances?.balances || balances.balances.length === 0 ? (
                <div className="space-y-1 py-8 text-center">
                  <p className="text-sm font-bold text-foreground">All settled up! 🎉</p>
                  <p className="text-xs text-muted-foreground">
                    No outstanding debts remaining in this group.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {balances.balances.map((b, i) => {
                    const isOwedByMe = b.from_user_id === user?.id;
                    const isOwedToMe = b.to_user_id === user?.id;
                    const amountFormatted = formatCurrency(
                      b.amount,
                      b.currency || group.default_currency,
                    );

                    let displayName = '';
                    let subtextNode: React.ReactNode = null;

                    if (isOwedByMe) {
                      displayName = b.to_user_name;
                      subtextNode = (
                        <span className="text-destructive text-xs font-medium">
                          You will pay {amountFormatted}
                        </span>
                      );
                    } else if (isOwedToMe) {
                      displayName = b.from_user_name;
                      subtextNode = (
                        <span className="text-xs font-medium text-success">
                          will pay you {amountFormatted}
                        </span>
                      );
                    } else {
                      displayName = `${b.from_user_name} → ${b.to_user_name}`;
                      subtextNode = (
                        <span className="text-xs text-muted-foreground">
                          Owes {amountFormatted}
                        </span>
                      );
                    }

                    return (
                      <Card
                        key={i}
                        variant="surface"
                        className="flex flex-col justify-between gap-1.5 border-border p-4 shadow-neo-1 transition-colors hover:border-primary/40"
                      >
                        <p className="truncate text-sm font-extrabold text-foreground">
                          {displayName}
                        </p>
                        {subtextNode}
                      </Card>
                    );
                  })}
                </div>
              )}
            </Card>
          </WorkspaceSection>

          <div className="grid grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2">
            {/* Members List */}
            <Card variant="raised" className="border-border p-5 shadow-neo-2">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon icon={Users} size={18} className="text-primary" />
                  <h2 className="font-semibold text-foreground">Group Members</h2>
                </div>
                <Badge variant="secondary" size="sm">
                  {group.members_count}
                </Badge>
              </div>
              <div className="space-y-2">
                {(members ?? group.members).map((m) => (
                  <div
                    key={m.user_id}
                    className="flex items-center justify-between border-b border-border/30 py-2 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.name}</p>
                      <p className="text-2xs text-muted-foreground">{m.email}</p>
                    </div>
                    <Badge variant="outline" size="sm">
                      {m.role}
                    </Badge>
                  </div>
                ))}
                {(members ?? group.members).length === 0 && (
                  <p className="py-4 text-center text-xs text-muted-foreground">No members yet</p>
                )}
              </div>
            </Card>

            {/* Recent Expenses List */}
            <Card variant="raised" className="border-border p-5 shadow-neo-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Recent Expenses</h2>
                <Link
                  href={ROUTES.dashboard.groupExpenses(groupId)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              {expensesLoading ? (
                <CardSkeleton />
              ) : recentExpenses.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-xs text-muted-foreground">No expenses recorded yet.</p>
                  <Link href={ROUTES.dashboard.newExpense(groupId)}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-3"
                      leftIcon={<Icon icon={Plus} size={16} />}
                    >
                      Add First Expense
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentExpenses.map((exp) => (
                    <Card
                      key={exp.id}
                      variant="surface"
                      className="flex items-center justify-between p-3"
                    >
                      <div>
                        <p className="text-xs font-semibold text-foreground">{exp.title}</p>
                        <p className="text-3xs text-muted-foreground">
                          Paid by {exp.paid_by_name} ·{' '}
                          {new Date(exp.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-foreground">
                          {formatCurrency(exp.total_amount, exp.currency)}
                        </p>
                        <Badge variant="secondary" size="sm">
                          {exp.split_type}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </WorkspaceBody>
      </Workspace>

      <AddMemberModal
        groupId={groupId}
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
      />

      <CreateSettlementModal
        groupId={groupId}
        members={members ?? group.members}
        currency={group.default_currency}
        isOpen={isSettleOpen}
        onClose={() => setIsSettleOpen(false)}
      />
    </ProtectedRoute>
  );
}
