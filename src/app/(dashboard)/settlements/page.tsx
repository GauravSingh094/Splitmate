'use client';

import { CreditCard, Users } from 'lucide-react';
import Link from 'next/link';

import { ProtectedRoute } from '@/components/auth/protected-route';
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
import { useGroups } from '@/features/groups/queries';

export default function SettlementsOverviewPage() {
  const { data: groups = [], isLoading } = useGroups();

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Settlements Directory
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Select a group to view and record debt settlements
            </p>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : groups.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 py-16 text-center shadow-neo-1">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-neo-1">
                  <Icon icon={CreditCard} size={24} />
                </div>
                <h3 className="text-base font-semibold text-foreground">No groups available</h3>
                <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                  Create a group to start tracking and settling balances.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groups.map((group) => (
                  <Link key={group.id} href={`/groups/${group.id}/settlements`}>
                    <Card
                      variant="interactive"
                      className="flex items-center justify-between border-border p-5 shadow-neo-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-neo-1">
                          <Icon icon={Users} size={20} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{group.name}</h3>
                          <p className="text-2xs text-muted-foreground">
                            {group.members_count} members
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">
                        {group.default_currency}
                      </Badge>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
