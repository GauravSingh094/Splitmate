import { HttpService } from '@/services/http.service';
import { tokenStorage } from '@/lib/auth/token-storage';
import type { SessionUser } from '@/types/session';
import type { LoginInput, RegisterInput } from './schemas/auth.schema';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
}

export interface TokenRefreshResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface MessageResponse {
  message: string;
}

export class AuthRepository {
  private static readonly basePath = '/auth';

  /**
   * Log in user — POST /auth/login returns { access_token, refresh_token, token_type }.
   * Stores tokens and fetches full user profile from GET /users/me.
   */
  static async login(data: LoginInput): Promise<AuthResponse> {
    const tokens = await HttpService.post<TokenRefreshResponse>(`${this.basePath}/login`, data);

    // Store tokens
    tokenStorage.setAccessToken(tokens.access_token);
    tokenStorage.setRefreshToken(tokens.refresh_token);

    // Fetch user profile
    const user = await this.getMe();

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      user,
    };
  }

  /**
   * Register user — POST /auth/register returns UserResponse shape.
   * NOTE: After register, user CANNOT login until email is verified.
   */
  static async register(data: RegisterInput): Promise<SessionUser> {
    return HttpService.post<SessionUser>(`${this.basePath}/register`, data);
  }

  /**
   * Logout — no backend logout endpoint; just clears local tokens.
   */
  static async logout(): Promise<void> {
    tokenStorage.clearTokens();
  }

  /**
   * Refresh tokens — POST /auth/refresh
   */
  static async refresh(refreshToken: string): Promise<TokenRefreshResponse> {
    return HttpService.post<TokenRefreshResponse>(`${this.basePath}/refresh`, {
      refresh_token: refreshToken,
    });
  }

  /**
   * Get current user — GET /users/me
   */
  static async getMe(): Promise<SessionUser> {
    return HttpService.get<SessionUser>('/users/me');
  }

  /**
   * Verify email with token from email link — POST /auth/verify-email
   */
  static async verifyEmail(token: string): Promise<MessageResponse> {
    return HttpService.post<MessageResponse>(`${this.basePath}/verify-email`, { token });
  }

  /**
   * Resend verification email — POST /auth/resend-verification
   * Always returns 200 — never reveals if email exists.
   */
  static async resendVerification(email: string): Promise<MessageResponse> {
    return HttpService.post<MessageResponse>(`${this.basePath}/resend-verification`, { email });
  }

  /**
   * Send password reset email — POST /auth/forgot-password
   * Always returns 200.
   */
  static async forgotPassword(email: string): Promise<MessageResponse> {
    return HttpService.post<MessageResponse>(`${this.basePath}/forgot-password`, { email });
  }

  /**
   * Reset password with token from email link — POST /auth/reset-password
   */
  static async resetPassword(token: string, newPassword: string): Promise<MessageResponse> {
    return HttpService.post<MessageResponse>(`${this.basePath}/reset-password`, {
      token,
      new_password: newPassword,
    });
  }
}
