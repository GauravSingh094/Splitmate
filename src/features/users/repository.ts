import { HttpService } from '@/services/http.service';
import type { UserProfile, UpdateUserInput } from './schemas/user.schema';

/**
 * UserRepository — matches production API endpoints exactly.
 *
 * GET   /users/me → UserResponse
 * PATCH /users/me → UserResponse
 */
export class UserRepository {
  static async getCurrentUser(): Promise<UserProfile> {
    return HttpService.get<UserProfile>('/users/me');
  }

  static async updateCurrentUser(data: UpdateUserInput): Promise<UserProfile> {
    return HttpService.patch<UserProfile>('/users/me', data);
  }
}
