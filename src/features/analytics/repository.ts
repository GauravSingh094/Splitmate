import { HttpService } from '@/services/http.service';
import type { GroupAnalytics, UserAnalytics } from './schemas/analytics.schema';

/**
 * AnalyticsRepository — matches production API endpoints exactly.
 *
 * GET /groups/{group_id}/analytics  → GroupAnalytics
 * GET /users/me/analytics           → UserAnalytics
 */
export class AnalyticsRepository {
  /**
   * Get full analytics for a specific group.
   * GET /groups/{group_id}/analytics
   */
  static async getGroupAnalytics(groupId: string): Promise<GroupAnalytics> {
    return HttpService.get<GroupAnalytics>(`/groups/${groupId}/analytics`);
  }

  /**
   * Get cross-group analytics for the current logged-in user.
   * GET /users/me/analytics
   */
  static async getUserAnalytics(): Promise<UserAnalytics> {
    return HttpService.get<UserAnalytics>('/users/me/analytics');
  }
}
