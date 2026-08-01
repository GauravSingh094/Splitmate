'use client';

import { Bell, CheckCheck, CreditCard, Receipt, RotateCcw, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { CardSkeleton } from '@/components/feedback/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { Icon } from '@/design-system/components/icon';
import {
  getNotificationRoute,
  useMarkAllAsRead,
  useMarkAsRead,
  useNotifications,
} from '@/features/notifications/queries';
import type { NotificationItem } from '@/features/notifications/schemas/notification.schema';

const typeIconMap: Record<string, typeof Receipt> = {
  EXPENSE_CREATED: Receipt,
  EXPENSE_REVERSED: RotateCcw,
  SETTLEMENT_RECORDED: CreditCard,
  MEMBER_ADDED: UserPlus,
};

function NotificationRow({
  notification,
  onMarkRead,
}: {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
}) {
  const router = useRouter();
  const IconComponent = typeIconMap[notification.type] || Bell;

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
      className={`flex cursor-pointer items-start justify-between gap-4 border-border p-4 transition-all hover:border-primary/30 ${
        !notification.is_read ? 'border-primary/20 bg-primary/5 shadow-neo-1' : ''
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
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
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
          aria-label="Mark as read"
        >
          <Icon icon={CheckCheck} size={14} />
        </Button>
      )}
    </Card>
  );
}

export default function NotificationsPage() {
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();

  const notifList = Array.isArray(notifications) ? notifications : [];
  const unread = notifList.filter((n) => !n.is_read);
  const read = notifList.filter((n) => n.is_read);

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Notifications</h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                All your expense, settlement, and group activity updates
              </p>
            </div>
            {unread.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Icon icon={CheckCheck} size={16} />}
                isLoading={markAllAsReadMutation.isPending}
                loadingText="Marking..."
                onClick={() => markAllAsReadMutation.mutate()}
              >
                Mark All Read
              </Button>
            )}
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          {isLoading ? (
            <WorkspaceSection>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </WorkspaceSection>
          ) : notifList.length === 0 ? (
            <WorkspaceSection>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 py-16 text-center shadow-neo-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-neo-1">
                  <Icon icon={Bell} size={24} />
                </div>
                <h3 className="text-base font-semibold text-foreground">All caught up!</h3>
                <p className="max-w-sm text-xs text-muted-foreground">
                  You have no notifications yet. Start adding expenses in a group to see activity
                  here.
                </p>
              </div>
            </WorkspaceSection>
          ) : (
            <>
              {/* Unread Section */}
              {unread.length > 0 && (
                <WorkspaceSection>
                  <div className="mb-3 flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-foreground">Unread</h2>
                    <Badge variant="default" size="sm">
                      {unread.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {unread.map((n) => (
                      <NotificationRow
                        key={n.id}
                        notification={n}
                        onMarkRead={(id) => markAsReadMutation.mutate(id)}
                      />
                    ))}
                  </div>
                </WorkspaceSection>
              )}

              {/* Read Section */}
              {read.length > 0 && (
                <WorkspaceSection>
                  <div className="mb-3 flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-foreground">Earlier</h2>
                    <Badge variant="secondary" size="sm">
                      {read.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {read.map((n) => (
                      <NotificationRow
                        key={n.id}
                        notification={n}
                        onMarkRead={(id) => markAsReadMutation.mutate(id)}
                      />
                    ))}
                  </div>
                </WorkspaceSection>
              )}
            </>
          )}
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
