import { HttpService } from '@/services/http.service';
import type {
  GroupBalancesResponse,
  SimplifiedBalancesResponse,
  UserOverallBalance,
} from './schemas/balance.schema';

/**
 * BalanceRepository — matches production API endpoints exactly.
 *
 * GET /groups/{group_id}/balances            → GroupBalancesResponse
 * GET /groups/{group_id}/balances/simplified → SimplifiedBalancesResponse
 * GET /users/me/balances                     → UserOverallBalance[]
 */
export class BalanceRepository {
  static async getGroupBalance(groupId: string): Promise<GroupBalancesResponse> {
    return HttpService.get<GroupBalancesResponse>(`/groups/${groupId}/balances`);
  }

  static async getSimplifiedBalance(groupId: string): Promise<SimplifiedBalancesResponse> {
    return HttpService.get<SimplifiedBalancesResponse>(`/groups/${groupId}/balances/simplified`);
  }

  static async getOverallBalances(): Promise<UserOverallBalance[]> {
    return HttpService.get<UserOverallBalance[]>('/users/me/balances');
  }
}
