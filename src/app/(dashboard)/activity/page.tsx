'use client';

import { useQuery } from '@tanstack/react-query';
import { Activity, Bell, CreditCard, Filter, RefreshCw, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { ActivityList, type ActivityItem } from '@/components/data/activity-list';
import { CardSkeleton } from '@/components/feedback/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/navigation/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { QUERY_KEYS } from '@/constants/query-keys';
import { Icon } from '@/design-system/components/icon';
import { ActivityRepository } from '@/features/activity/repository';

export default function ActivityPage() {
  const [filter, setFilter] = useState<'all' | 'expense' | 'settlement' | 'group'>('all');

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: QUERY_KEYS.activity.list(),
    queryFn: () => ActivityRepository.getActivityFeed(),
  });

  const rawItems = data?.data ?? [];

  const items: ActivityItem[] = rawItems
    .filter((item) => {
      if (filter === 'expense') return item.title.toLowerCase().includes('expense');
      if (filter === 'settlement')
        return (
          item.title.toLowerCase().includes('settle') ||
          item.title.toLowerCase().includes('payment')
        );
      if (filter === 'group')
        return (
          item.title.toLowerCase().includes('group') || item.title.toLowerCase().includes('member')
        );
      return true;
    })
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      timestamp: item.createdAt,
      user: {
        name: item.actorName,
        avatar: item.actorAvatar ?? undefined,
      },
    }));

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Icon icon={Activity} size={24} className="text-primary" />
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Recent Activity
                </h1>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Real-time audit log of expenses created, settlements recorded, and group events
                across your account.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              isLoading={isRefetching}
              leftIcon={<Icon icon={RefreshCw} size={16} />}
            >
              Refresh Feed
            </Button>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection className="space-y-6">
            {/* Filter Tabs */}
            <Card
              variant="surface"
              className="flex flex-col items-center justify-between gap-3 border-border p-3 shadow-neo-1 sm:flex-row"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Icon icon={Filter} size={16} />
                <span>Filter Feed:</span>
              </div>
              <Tabs
                defaultValue="all"
                value={filter}
                onValueChange={(val) => setFilter(val as typeof filter)}
                className="w-full sm:w-auto"
              >
                <TabsList className="w-full justify-start sm:w-auto">
                  <TabsTrigger value="all" className="px-3 py-1 text-xs">
                    All ({rawItems.length})
                  </TabsTrigger>
                  <TabsTrigger value="expense" className="px-3 py-1 text-xs">
                    <Icon icon={Sparkles} size={14} className="mr-1.5 inline" />
                    Expenses
                  </TabsTrigger>
                  <TabsTrigger value="settlement" className="px-3 py-1 text-xs">
                    <Icon icon={CreditCard} size={14} className="mr-1.5 inline" />
                    Settlements
                  </TabsTrigger>
                  <TabsTrigger value="group" className="px-3 py-1 text-xs">
                    <Icon icon={Users} size={14} className="mr-1.5 inline" />
                    Groups
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>

            {/* Activity Stream */}
            <Card variant="raised" className="border-border p-6 shadow-neo-2">
              {isLoading ? (
                <div className="space-y-4">
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              ) : items.length === 0 ? (
                <div className="space-y-3 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground shadow-neo-inset">
                    <Icon icon={Bell} size={24} />
                  </div>
                  <h3 className="text-base font-bold text-foreground">No recent activity</h3>
                  <p className="mx-auto max-w-sm text-xs text-muted-foreground">
                    When you create expenses, record payments, or join groups, event logs will
                    appear right here in real time.
                  </p>
                </div>
              ) : (
                <ActivityList items={items} />
              )}
            </Card>
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
