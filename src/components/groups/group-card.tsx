'use client';

import { Users } from 'lucide-react';
import Link from 'next/link';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import type { Group } from '@/features/groups/schemas/group.schema';

export interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Link href={ROUTES.dashboard.group(group.id)}>
      <Card
        variant="interactive"
        className="flex h-full flex-col justify-between gap-4 p-5 transition-all duration-200 hover:border-primary/50"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-neo-1">
              <Icon icon={Users} size={20} />
            </div>
            <div>
              <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-foreground">
                {group.name}
              </h3>
              <p className="text-2xs line-clamp-1 text-muted-foreground">
                {group.members_count} member{group.members_count !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {group.status === 'settled' && (
              <span className="text-2xs rounded-full border border-success/20 bg-success/10 px-2 py-0.5 font-bold tracking-wider text-success uppercase">
                Settled Up
              </span>
            )}
            <Badge variant="outline" size="sm">
              {group.default_currency}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Avatar fallback={group.name} size="xs" />
            <span>{group.members_count} members</span>
          </div>
          <span>Created {new Date(group.created_at).toLocaleDateString()}</span>
        </div>
      </Card>
    </Link>
  );
}
