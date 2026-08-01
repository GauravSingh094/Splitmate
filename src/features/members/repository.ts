import { HttpService } from '@/services/http.service';
import type { Member, AddMemberInput } from './schemas/member.schema';

/**
 * MemberRepository — matches production API endpoints exactly.
 *
 * GET    /groups/{group_id}/members             → Member[]
 * POST   /groups/{group_id}/members             → Member  (body: { email })
 * DELETE /groups/{group_id}/members/{user_id}   → 204
 */
export class MemberRepository {
  static async getMembers(groupId: string): Promise<Member[]> {
    return HttpService.get<Member[]>(`/groups/${groupId}/members`);
  }

  static async addMember(groupId: string, data: AddMemberInput): Promise<Member> {
    // API only accepts { email } — no role field
    return HttpService.post<Member>(`/groups/${groupId}/members`, { email: data.email });
  }

  static async removeMember(groupId: string, userId: string): Promise<void> {
    return HttpService.delete<void>(`/groups/${groupId}/members/${userId}`);
  }
}
