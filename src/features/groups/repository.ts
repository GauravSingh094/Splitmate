import { HttpService } from '@/services/http.service';
import type {
  Group,
  GroupDetail,
  CreateGroupInput,
  UpdateGroupInput,
} from './schemas/group.schema';

/**
 * GroupRepository — matches production API endpoints exactly.
 *
 * GET    /groups              → Group[]  (raw array, not paginated)
 * GET    /groups/{id}         → GroupDetail
 * POST   /groups              → GroupDetail
 * PATCH  /groups/{id}         → GroupDetail
 * PATCH  /groups/{id}/archive → GroupDetail  (archive — no DELETE endpoint)
 */
export class GroupRepository {
  private static readonly basePath = '/groups';

  static async getGroups(): Promise<Group[]> {
    return HttpService.get<Group[]>(this.basePath);
  }

  static async getGroupById(id: string): Promise<GroupDetail> {
    return HttpService.get<GroupDetail>(`${this.basePath}/${id}`);
  }

  static async createGroup(data: CreateGroupInput): Promise<GroupDetail> {
    // API expects { name, default_currency } — NOT "currency"
    return HttpService.post<GroupDetail>(this.basePath, {
      name: data.name,
      default_currency: data.currency,
    });
  }

  static async updateGroup(id: string, data: UpdateGroupInput): Promise<GroupDetail> {
    return HttpService.patch<GroupDetail>(`${this.basePath}/${id}`, data);
  }

  /**
   * Archive a group — PATCH /groups/{id}/archive
   * Archived groups are removed from GET /groups and excluded from balances.
   * There is no DELETE endpoint.
   */
  static async archiveGroup(id: string): Promise<GroupDetail> {
    return HttpService.patch<GroupDetail>(`${this.basePath}/${id}/archive`, {});
  }
}
