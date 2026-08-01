'use client';

import { ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { CardSkeleton } from '@/components/feedback/skeleton';
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
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useGroupDetail } from '@/features/groups/queries';
import { useGroupMembers } from '@/features/members/queries';
import { useGroupSettlements } from '@/features/settlements/queries';

export default function GroupSettlementsPage() {
  const params = useParams<{ groupId: string }>();
  const groupId = params.groupId;

  const [isSettleOpen, setIsSettleOpen] = useState(false);

  const { data: group } = useGroupDetail(groupId);
  const { data: members } = useGroupMembers(groupId);
  const { data: settlements, isLoading } = useGroupSettlements(groupId);

  const groupMembers = members ?? group?.members ?? [];

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
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Settlements</h1>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Payment and debt settlement log for {group?.name ?? 'this group'}
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => setIsSettleOpen(true)}
                leftIcon={<Icon icon={CreditCard} size={18} />}
              >
                Settle Up
              </Button>
            </div>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection>
            {isLoading ? (
              <div className="space-y-3">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : !settlements || settlements.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 py-16 text-center shadow-neo-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-neo-1">
                  <Icon icon={CreditCard} size={24} />
                </div>
                <h3 className="text-base font-semibold text-foreground">No settlements recorded</h3>
                <p className="max-w-sm text-xs text-muted-foreground">
                  Record payments between group members to settle debts.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsSettleOpen(true)}
                  leftIcon={<Icon icon={CreditCard} size={16} />}
                >
                  Settle Up
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {settlements.map((s) => (
                  <Card
                    key={s.id}
                    variant="raised"
                    className="flex items-center justify-between gap-4 border-border p-4 shadow-neo-1"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {s.from_user_name || s.from_user_id} → {s.to_user_name || s.to_user_id}
                      </p>
                      {s.note && (
                        <p className="text-2xs mt-0.5 text-muted-foreground italic">
                          Note: {s.note}
                        </p>
                      )}
                      <p className="text-2xs mt-0.5 text-muted-foreground">
                        Recorded on {new Date(s.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-extrabold text-success">
                        {s.currency} {parseFloat(s.amount).toFixed(2)}
                      </p>
                      <Badge variant="success" size="sm">
                        {s.status}
                      </Badge>
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
        members={groupMembers}
        currency={group?.default_currency}
        isOpen={isSettleOpen}
        onClose={() => setIsSettleOpen(false)}
      />
    </ProtectedRoute>
  );
}
