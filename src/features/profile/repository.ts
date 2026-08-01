import { UserRepository } from '@/features/users/repository';
import type { UserProfile, UpdateUserInput } from '@/features/users/schemas/user.schema';

/**
 * ProfileRepository — delegates to UserRepository (GET /users/me, PATCH /users/me).
 */
export class ProfileRepository {
  static async getProfile(): Promise<UserProfile> {
    return UserRepository.getCurrentUser();
  }

  static async updateProfile(data: UpdateUserInput): Promise<UserProfile> {
    return UserRepository.updateCurrentUser(data);
  }
}
