'use client';

import { useQuery } from '@tanstack/react-query';

import { ActivityList, type ActivityItem } from '@/components/data/activity-list';
import { Widget, WidgetBody, WidgetFooter, WidgetHeader } from '@/components/widgets/widget';
import { QUERY_KEYS } from '@/constants/query-keys';
import { ActivityRepository } from '@/features/activity/repository';

export function DashboardActivityWidget() {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.activity.list(),
    queryFn: () => ActivityRepository.getActivityFeed(),
  });

  const rawItems = data?.data ?? [];

  const items: ActivityItem[] = rawItems.map((item) => ({
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
    <Widget>
      <WidgetHeader>
        <h3 className="text-sm font-semibold">Recent Activity</h3>
      </WidgetHeader>

      <WidgetBody>
        {items.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No recent activity recorded yet.
          </div>
        ) : (
          <ActivityList items={items} />
        )}
      </WidgetBody>

      <WidgetFooter>
        <span>Activity Feed</span>
      </WidgetFooter>
    </Widget>
  );
}
