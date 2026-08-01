'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Receipt } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Widget, WidgetBody, WidgetFooter, WidgetHeader } from '@/components/widgets/widget';
import { QUERY_KEYS } from '@/constants/query-keys';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { GroupRepository } from '@/features/groups/repository';

export function DashboardExpensesWidget() {
  const { data: groups = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.groups.list(),
    queryFn: () => GroupRepository.getGroups(),
  });

  return (
    <Widget>
      <WidgetHeader>
        <div className="flex items-center gap-2">
          <Icon icon={Receipt} size={18} className="text-primary" />
          <h3 className="text-sm font-semibold">Group Expenses Overview</h3>
        </div>
      </WidgetHeader>

      <WidgetBody>
        {groups.length === 0 && !isLoading ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No expenses recorded yet. Create a group to start adding expenses.
          </div>
        ) : (
          <div className="space-y-2">
            {groups.slice(0, 5).map((group) => (
              <Link key={group.id} href={ROUTES.dashboard.groupExpenses(group.id)}>
                <div className="flex items-center justify-between rounded-xl border border-border/50 bg-surface p-3 transition-colors hover:border-primary/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{group.name}</p>
                    <p className="text-2xs text-muted-foreground">{group.members_count} members</p>
                  </div>
                  <Badge variant="outline" size="sm">
                    {group.default_currency}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </WidgetBody>

      <WidgetFooter>
        <span>View expenses by group</span>
        <Link href={ROUTES.dashboard.groups}>
          <Button variant="ghost" size="xs" rightIcon={<Icon icon={ArrowRight} size={14} />}>
            All Groups
          </Button>
        </Link>
      </WidgetFooter>
    </Widget>
  );
}
