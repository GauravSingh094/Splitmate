/**
 * Token Storage — manages access and refresh tokens.
 *
 * Both tokens are persisted in localStorage so session survives page refresh.
 * Also cached in memory for fast synchronous access.
 */

const ACCESS_TOKEN_KEY = 'splito_access_token';
const REFRESH_TOKEN_KEY = 'splito_refresh_token';

let inMemoryAccessToken: string | null = null;

export const tokenStorage = {
  // ─── Access Token ────────────────────────────────────────────────────────
  getAccessToken(): string | null {
    if (inMemoryAccessToken) return inMemoryAccessToken;
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (stored) inMemoryAccessToken = stored;
      return stored;
    } catch {
      return null;
    }
  },

  setAccessToken(token: string): void {
    inMemoryAccessToken = token;
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch {
      /* ignore storage errors */
    }
  },

  clearAccessToken(): void {
    inMemoryAccessToken = null;
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },

  // ─── Refresh Token ───────────────────────────────────────────────────────
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch {
      /* ignore storage errors */
    }
  },

  clearRefreshToken(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },

  // ─── Combined ─────────────────────────────────────────────────────────────
  clearTokens(): void {
    this.clearAccessToken();
    this.clearRefreshToken();
  },

  hasTokens(): boolean {
    return this.getAccessToken() !== null || this.getRefreshToken() !== null;
  },
};
