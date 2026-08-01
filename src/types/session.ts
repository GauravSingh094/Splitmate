/**
 * Session and authentication types.
 * Aligned with the real backend UserResponse schema.
 */

// ─── Roles & Permissions (stubs for UI compatibility) ──────────────────────
export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';
export type Permission = string;

export function hasPermission(_user: unknown, _permission: string): boolean {
  return true;
}

export function hasRole(_user: unknown, _role: UserRole): boolean {
  return true;
}

export function hasAtLeastRole(_user: unknown, _minRole: UserRole): boolean {
  return true;
}

// ─── User ─────────────────────────────────────────────────────────────────────

/**
 * The authenticated user's profile stored in session.
 * Fields match the API's UserResponse schema exactly.
 */
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  preferred_currency: string;
  is_active: boolean;
  avatarUrl?: string | null;
}

// ─── Session State ────────────────────────────────────────────────────────────

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface SessionState {
  status: AuthStatus;
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ─── Guards ───────────────────────────────────────────────────────────────────

export function isAuthenticated(
  session: SessionState,
): session is SessionState & { user: SessionUser } {
  return session.status === 'authenticated' && session.user !== null;
}
