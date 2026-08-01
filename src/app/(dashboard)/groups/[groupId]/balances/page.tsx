'use client';

import { use, useState } from 'react';
import { ArrowLeft, GitBranch, RefreshCw, Zap } from 'lucide-react';
import Link from 'next/link';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { CardSkeleton } from '@/components/feedback/skeleton';
import { CreateSettlementModal } from '@/components/settlements';
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
import { useGroupBalances, useSimplifiedBalances } from '@/features/balances/queries';
import { useGroupMembers } from '@/features/members/queries';
import type { PairwiseBalance } from '@/features/balances/schemas/balance.schema';

export default function GroupBalancesPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = use(params);
  const [isSimplified, setIsSimplified] = useState(false);
  const [isSettleOpen, setIsSettleOpen] = useState(false);

  const {
    data: standardData,
    isLoading: stdLoading,
    refetch: refetchStd,
  } = useGroupBalances(groupId);
  const {
    data: simplifiedData,
    isLoading: simpLoading,
    refetch: refetchSimp,
  } = useSimplifiedBalances(groupId);
  const { data: members = [] } = useGroupMembers(groupId);

  const isLoading = isSimplified ? simpLoading : stdLoading;
  const currency = standardData?.currency || 'USD';

  const balancesList: PairwiseBalance[] = isSimplified
    ? (simplifiedData?.transactions ?? [])
    : (standardData?.balances ?? []);

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Link href={ROUTES.dashboard.group(groupId)}>
                <Button variant="outline" size="icon">
                  <Icon icon={ArrowLeft} size={16} />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Group Balances
                </h1>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Pairwise balances and settlement recommendations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={isSimplified ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setIsSimplified((v) => !v)}
                leftIcon={<Icon icon={Zap} size={16} />}
              >
                {isSimplified ? 'Simplified Debts' : 'Standard Balances'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => (isSimplified ? refetchSimp() : refetchStd())}
              >
                <Icon icon={RefreshCw} size={16} />
              </Button>
            </div>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          {/* Explanation Banner */}
          <WorkspaceSection>
            <Card
              variant="surface"
              className="flex items-center gap-3 border-border bg-primary/5 p-4"
            >
              <Icon icon={GitBranch} size={20} className="shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                {isSimplified
                  ? 'Simplified Debts algorithm minimizes the total number of transactions required to settle up.'
                  : 'Standard Balances displays direct individual debt calculations between group members.'}
              </p>
            </Card>
          </WorkspaceSection>

          {/* Balance Cards List */}
          <WorkspaceSection>
            {isLoading ? (
              <div className="space-y-4">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : balancesList.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                All settled up! No active debts in this group. 🎉
              </div>
            ) : (
              <div className="space-y-3">
                {balancesList.map((b, i) => (
                  <Card
                    key={i}
                    variant="raised"
                    className="flex items-center justify-between border-border p-4 shadow-neo-1"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {b.from_user_name} → {b.to_user_name}
                      </p>
                      <p className="text-2xs mt-0.5 text-muted-foreground">
                        {b.from_user_name} owes {b.to_user_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-destructive text-base font-extrabold">
                        {b.currency} {parseFloat(b.amount).toFixed(2)}
                      </span>
                      <Button variant="primary" size="xs" onClick={() => setIsSettleOpen(true)}>
                        Settle Up
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>

      <CreateSettlementModal
        groupId={groupId}
        members={members}
        currency={currency}
        isOpen={isSettleOpen}
        onClose={() => setIsSettleOpen(false)}
      />
    </ProtectedRoute>
  );
}
