'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Widget, WidgetBody, WidgetFooter, WidgetHeader } from '@/components/widgets/widget';
import { QUERY_KEYS } from '@/constants/query-keys';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { GroupRepository } from '@/features/groups/repository';

export function DashboardGroupsWidget() {
  const { data: groups = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.groups.list(),
    queryFn: () => GroupRepository.getGroups(),
  });

  return (
    <Widget>
      <WidgetHeader>
        <div className="flex items-center gap-2">
          <Icon icon={Users} size={18} className="text-primary" />
          <h3 className="text-sm font-semibold">Active Groups</h3>
        </div>
      </WidgetHeader>

      <WidgetBody>
        {groups.length === 0 && !isLoading ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No active groups. Create a group to start sharing expenses.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {groups.slice(0, 4).map((group) => (
              <Link key={group.id} href={ROUTES.dashboard.group(group.id)}>
                <Card
                  variant="interactive"
                  className="flex flex-col gap-2 p-3.5 transition-all hover:border-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {group.name}
                    </span>
                    <Badge variant="outline" size="sm">
                      {group.default_currency}
                    </Badge>
                  </div>
                  <div className="text-2xs flex items-center justify-between text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Avatar fallback={group.name} size="xs" />
                      <span>{group.members_count} members</span>
                    </div>
                    <span>{new Date(group.created_at).toLocaleDateString()}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </WidgetBody>

      <WidgetFooter>
        <span>{groups.length} active groups</span>
        <Link href={ROUTES.dashboard.groups}>
          <Button variant="ghost" size="xs" rightIcon={<Icon icon={ArrowRight} size={14} />}>
            All Groups
          </Button>
        </Link>
      </WidgetFooter>
    </Widget>
  );
}
