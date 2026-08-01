import { HttpService } from '@/services/http.service';
import type { PaginatedResponse, PaginationParams } from '@/types/api';
import type { ActivityItemModel } from './schemas/activity.schema';

/**
 * ActivityRepository — composes real backend notifications & expense updates into an Activity feed.
 *
 * GET /notifications → NotificationItem[]
 */
export class ActivityRepository {
  static async getActivityFeed(
    _params?: PaginationParams,
  ): Promise<PaginatedResponse<ActivityItemModel>> {
    try {
      // Fetch live notifications from backend API
      const notifications = await HttpService.get<
        Array<{
          id: string;
          title: string;
          message: string;
          is_read: boolean;
          created_at: string;
        }>
      >('/notifications');

      const items: ActivityItemModel[] = (Array.isArray(notifications) ? notifications : []).map(
        (n) => ({
          id: n.id,
          title: n.title,
          description: n.message,
          actorName: n.title.includes('Expense')
            ? 'Expense Update'
            : n.title.includes('Group')
              ? 'Group Activity'
              : 'Notification',
          actorAvatar: null,
          createdAt: n.created_at,
        }),
      );

      return {
        data: items,
        pagination: {
          page: 1,
          pageSize: items.length,
          total: items.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        message: 'Success',
        success: true,
      };
    } catch {
      return {
        data: [],
        pagination: {
          page: 1,
          pageSize: 0,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        message: 'Success',
        success: true,
      };
    }
  }
}
