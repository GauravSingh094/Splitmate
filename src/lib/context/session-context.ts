import { createContext, useContext } from 'react';

import type { SessionState, SessionUser } from '@/types/session';

/** Default unauthenticated session state. */
export const DEFAULT_SESSION_STATE: SessionState = {
  status: 'loading',
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

/** Full session context value — state + actions. */
export interface SessionContextValue extends SessionState {
  /** Called after successful login/register to update session state. */
  login: (user: SessionUser, accessToken: string, refreshToken?: string) => void;
  /** Called on logout — clears tokens and resets state. */
  logout: () => void;
}

export const SessionContext = createContext<SessionContextValue>({
  ...DEFAULT_SESSION_STATE,
  login: () => {},
  logout: () => {},
});
SessionContext.displayName = 'SessionContext';

/**
 * Access the current session state and actions.
 * Must be used inside `<SessionProvider>`.
 */
export function useSession(): SessionContextValue {
  return useContext(SessionContext);
}
