'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_SESSION_STATE, SessionContext } from '@/lib/context/session-context';
import { tokenStorage } from '@/lib/auth/token-storage';
import { UserRepository } from '@/features/users/repository';
import { AuthRepository } from '@/features/auth/repository';
import type { SessionState, SessionUser } from '@/types/session';

/**
 * SessionProvider — manages authentication state for the entire app.
 *
 * On mount:
 *   1. Checks for stored access & refresh tokens.
 *   2. If access token missing but refresh token exists -> refreshes token.
 *   3. Calls GET /users/me to validate session and load user profile.
 *   4. If valid -> sets status: 'authenticated' with user object.
 *   5. If invalid -> clears tokens and sets status: 'unauthenticated'.
 */
export function SessionProvider({ children }: { readonly children: React.ReactNode }) {
  const [session, setSession] = useState<SessionState>({
    ...DEFAULT_SESSION_STATE,
    status: 'loading',
    isLoading: true,
  });

  // ─── Restore session on mount ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      let token = tokenStorage.getAccessToken();
      const refreshToken = tokenStorage.getRefreshToken();

      // No credentials at all — mark unauthenticated immediately
      if (!token && !refreshToken) {
        if (!cancelled) {
          setSession({
            status: 'unauthenticated',
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
        return;
      }

      // Access token missing but refresh token present -> refresh first
      if (!token && refreshToken) {
        try {
          const refreshed = await AuthRepository.refresh(refreshToken);
          tokenStorage.setAccessToken(refreshed.access_token);
          tokenStorage.setRefreshToken(refreshed.refresh_token);
          token = refreshed.access_token;
        } catch {
          tokenStorage.clearTokens();
          if (!cancelled) {
            setSession({
              status: 'unauthenticated',
              user: null,
              isLoading: false,
              isAuthenticated: false,
            });
          }
          return;
        }
      }

      try {
        // Validate the token by fetching current user profile
        const user = await UserRepository.getCurrentUser();
        if (!cancelled) {
          setSession({
            status: 'authenticated',
            user: user as SessionUser,
            isLoading: false,
            isAuthenticated: true,
          });
        }
      } catch {
        // Token validation failed — attempt silent refresh if we have a refresh token
        const currentRefreshToken = tokenStorage.getRefreshToken();
        if (currentRefreshToken) {
          try {
            const refreshed = await AuthRepository.refresh(currentRefreshToken);
            tokenStorage.setAccessToken(refreshed.access_token);
            tokenStorage.setRefreshToken(refreshed.refresh_token);
            const user = await UserRepository.getCurrentUser();
            if (!cancelled) {
              setSession({
                status: 'authenticated',
                user: user as SessionUser,
                isLoading: false,
                isAuthenticated: true,
              });
              return;
            }
          } catch {
            // Fallthrough to logout
          }
        }

        // Token expired/invalid and refresh failed — clear tokens
        tokenStorage.clearTokens();
        if (!cancelled) {
          setSession({
            status: 'unauthenticated',
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Login action (called from login/register pages) ─────────────────────
  const login = useCallback((user: SessionUser, accessToken: string, refreshToken?: string) => {
    tokenStorage.setAccessToken(accessToken);
    if (refreshToken) {
      tokenStorage.setRefreshToken(refreshToken);
    }
    setSession({
      status: 'authenticated',
      user,
      isLoading: false,
      isAuthenticated: true,
    });
  }, []);

  // ─── Logout action ─────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    tokenStorage.clearTokens();
    setSession({
      status: 'unauthenticated',
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  // ─── Memoize context value ─────────────────────────────────────────────────
  const value = useMemo(() => ({ ...session, login, logout }), [session, login, logout]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
