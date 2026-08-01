import type { QueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys';

/**
 * Enterprise Entity Cache Manager.
 * Orchestrates targeted, fine-grained cache invalidations across domain entities.
 */
export class EntityCacheManager {
  constructor(private queryClient: QueryClient) {}

  /** Invalidate current user & profile caches */
  async invalidateUser(): Promise<void> {
    await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.all() });
  }

  /** Invalidate group lists or specific group details */
  async invalidateGroups(groupId?: string): Promise<void> {
    if (groupId) {
      await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.groups.detail(groupId) });
    } else {
      await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.groups.all() });
    }
  }

  /** Invalidate group members */
  async invalidateMembers(groupId: string): Promise<void> {
    await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members.byGroup(groupId) });
    await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.groups.members(groupId) });
  }

  /** Invalidate expenses (triggers balance & analytics revalidation) */
  async invalidateExpenses(groupId?: string): Promise<void> {
    await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.expenses.all() });
    await this.invalidateBalances(groupId);
    await this.invalidateAnalytics(groupId);
  }

  /** Invalidate balance summaries */
  async invalidateBalances(groupId?: string): Promise<void> {
    if (groupId) {
      await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.groups.balances(groupId) });
      await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balances.byGroup(groupId) });
    }
    await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balances.summary() });
  }

  /** Invalidate analytics & KPI dashboards */
  async invalidateAnalytics(groupId?: string): Promise<void> {
    await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analytics.summary(groupId) });
  }

  /** Invalidate notification list & unread counts */
  async invalidateNotifications(): Promise<void> {
    await this.queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications.all() });
  }

  /** Global reset of all entity caches */
  async resetAll(): Promise<void> {
    await this.queryClient.resetQueries();
  }
}
