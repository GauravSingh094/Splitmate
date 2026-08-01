'use client';

import { Bell, CheckCheck } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { NoNotificationsEmptyState } from '@/components/feedback/empty-states/domain-empty-states';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/navigation/tabs';
import { NotificationCard } from '@/components/notifications/notification-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import {
  useMarkAllAsRead,
  useMarkAsRead,
  useNotifications,
  useUnreadNotificationsCount,
} from '@/features/notifications/queries';

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useNotifications();
  const unreadCount = useUnreadNotificationsCount();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();

  // Close when clicking anywhere outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const notifications = Array.isArray(data) ? data : [];
  const unreadNotifications = notifications.filter((n) => !n.is_read);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open notifications panel"
        className="relative"
      >
        <Icon icon={Bell} size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
        )}
      </Button>

      {isOpen && (
        <>
          {/* Blurred Background Overlay */}
          <div
            className="fixed inset-0 z-40 bg-background/20 backdrop-blur-sm transition-all"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <Card
            variant="raised"
            className="absolute top-full right-0 z-50 mt-2 w-80 animate-in border border-border p-4 shadow-neo-4 duration-150 fade-in slide-in-from-top-2 sm:w-96"
          >
            <div className="mb-3 flex items-center justify-between border-b border-border/40 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-2xs rounded-full bg-primary/10 px-1.5 py-0.5 font-bold text-primary">
                    {unreadCount}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => markAllAsReadMutation.mutate()}
                isLoading={markAllAsReadMutation.isPending}
                leftIcon={<Icon icon={CheckCheck} size={14} />}
              >
                Mark all read
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-3 w-full justify-between">
                <TabsTrigger value="all" className="flex-1 py-1 text-xs">
                  All ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1 py-1 text-xs">
                  Unread ({unreadNotifications.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="max-h-80 space-y-2 overflow-y-auto">
                {isLoading ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">Loading...</div>
                ) : notifications.length === 0 ? (
                  <NoNotificationsEmptyState />
                ) : (
                  notifications.map((n) => (
                    <NotificationCard
                      key={n.id}
                      notification={n}
                      onMarkRead={(id) => markAsReadMutation.mutate(id)}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="unread" className="max-h-80 space-y-2 overflow-y-auto">
                {isLoading ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">Loading...</div>
                ) : unreadNotifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No unread notifications
                  </div>
                ) : (
                  unreadNotifications.map((n) => (
                    <NotificationCard
                      key={n.id}
                      notification={n}
                      onMarkRead={(id) => markAsReadMutation.mutate(id)}
                    />
                  ))
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-3 border-t border-border/40 pt-3 text-center">
              <Link
                href={ROUTES.dashboard.notifications}
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                View all notifications
              </Link>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
