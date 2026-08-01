import { HttpService } from '@/services/http.service';
import type { NotificationItem, MarkAllReadResponse } from './schemas/notification.schema';

/**
 * NotificationRepository — matches production API endpoints exactly.
 *
 * GET   /notifications                         → NotificationItem[]
 * PATCH /notifications/read-all                → MarkAllReadResponse
 * PATCH /notifications/{notification_id}/read  → NotificationItem (updated)
 */
export class NotificationRepository {
  static async getNotifications(): Promise<NotificationItem[]> {
    return HttpService.get<NotificationItem[]>('/notifications');
  }

  static async markAllAsRead(): Promise<MarkAllReadResponse> {
    return HttpService.patch<MarkAllReadResponse>('/notifications/read-all', {});
  }

  static async markAsRead(notificationId: string): Promise<NotificationItem> {
    return HttpService.patch<NotificationItem>(`/notifications/${notificationId}/read`, {});
  }
}
