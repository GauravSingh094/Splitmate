import { HttpService } from '@/services/http.service';
import type { Settlement, CreateSettlementInput } from './schemas/settlement.schema';

/**
 * SettlementRepository — matches production API endpoints exactly.
 *
 * GET  /groups/{group_id}/settlements → Settlement[]
 * POST /groups/{group_id}/settlements → Settlement
 *
 * API uses from_user_id / to_user_id (directional: from pays to).
 */
export class SettlementRepository {
  static async getSettlements(groupId: string): Promise<Settlement[]> {
    return HttpService.get<Settlement[]>(`/groups/${groupId}/settlements`);
  }

  static async createSettlement(groupId: string, data: CreateSettlementInput): Promise<Settlement> {
    return HttpService.post<Settlement>(`/groups/${groupId}/settlements`, {
      from_user_id: data.from_user_id,
      to_user_id: data.to_user_id,
      amount: String(data.amount),
      currency: data.currency,
      ...(data.note ? { note: data.note } : {}),
    });
  }
}
