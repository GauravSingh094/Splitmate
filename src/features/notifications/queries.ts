import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { NotificationRepository } from '@/features/notifications/repository';
import type { NotificationItem } from '@/features/notifications/schemas/notification.schema';
import { toast } from '@/lib/toast';

/**
 * Hook to fetch all notifications for current user (GET /notifications).
 * Polls every 60 seconds on window focus or interval.
 */
export function useNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.notifications.all(),
    queryFn: () => NotificationRepository.getNotifications(),
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    // Return empty array on error so UI doesn't break
    placeholderData: [] as NotificationItem[],
  });
}

/**
 * Hook to get count of unread notifications.
 * Uses is_read field from API (not "read").
 */
export function useUnreadNotificationsCount() {
  const { data } = useNotifications();
  const notifications = Array.isArray(data) ? data : [];
  return notifications.filter((n) => !n.is_read).length;
}

/**
 * Mutation to mark a single notification as read (PATCH /notifications/{id}/read).
 */
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => NotificationRepository.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications.all() });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to mark notification as read');
    },
  });
}

/**
 * Mutation to mark all notifications as read (PATCH /notifications/read-all).
 */
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => NotificationRepository.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications.all() });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to mark notifications as read');
    },
  });
}

/**
 * Get deep-link route from notification metadata.
 */
export function getNotificationRoute(notification: NotificationItem): string {
  const { type, metadata } = notification;
  switch (type) {
    case 'EXPENSE_CREATED':
    case 'EXPENSE_REVERSED':
      return metadata?.expense_id
        ? `/expenses/${metadata.expense_id}`
        : metadata?.group_id
          ? `/groups/${metadata.group_id}/expenses`
          : '/notifications';
    case 'SETTLEMENT_RECORDED':
      return metadata?.group_id ? `/groups/${metadata.group_id}/settlements` : '/notifications';
    case 'MEMBER_ADDED':
      return metadata?.group_id ? `/groups/${metadata.group_id}` : '/notifications';
    default:
      return '/notifications';
  }
}
