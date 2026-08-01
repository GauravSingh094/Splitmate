'use client';

import { Check, CreditCard, Receipt, RotateCcw, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';
import { getNotificationRoute } from '@/features/notifications/queries';
import type { NotificationItem } from '@/features/notifications/schemas/notification.schema';

export interface NotificationCardProps {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
}

export function NotificationCard({ notification, onMarkRead }: NotificationCardProps) {
  const router = useRouter();
  const iconMap: Record<string, typeof Receipt> = {
    EXPENSE_CREATED: Receipt,
    EXPENSE_REVERSED: RotateCcw,
    SETTLEMENT_RECORDED: CreditCard,
    MEMBER_ADDED: UserPlus,
  };

  const IconComponent = iconMap[notification.type] || Receipt;

  const handleClick = () => {
    if (!notification.is_read) {
      onMarkRead(notification.id);
    }
    const route = getNotificationRoute(notification);
    if (route && route !== '/notifications') {
      router.push(route);
    }
  };

  return (
    <Card
      variant="surface"
      className={`flex cursor-pointer items-start justify-between gap-4 border-border p-4 transition-all hover:border-primary/20 ${
        !notification.is_read ? 'border-primary/30 bg-primary/5 shadow-neo-2' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            !notification.is_read
              ? 'bg-primary text-primary-foreground'
              : 'bg-surface-raised text-muted-foreground'
          }`}
        >
          <Icon icon={IconComponent} size={18} />
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2">
            <span className="line-clamp-1 text-sm font-bold tracking-tight text-foreground">
              {notification.title}
            </span>
            {!notification.is_read && (
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
            )}
          </div>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {notification.message}
          </p>
          <span className="text-2xs mt-1 text-muted-foreground/80">
            {new Date(notification.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      {!notification.is_read && (
        <Button
          variant="ghost"
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            onMarkRead(notification.id);
          }}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Icon icon={Check} size={14} />
        </Button>
      )}
    </Card>
  );
}
