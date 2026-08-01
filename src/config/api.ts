import { env } from './env';

/**
 * API connection configuration.
 * Business-specific endpoints are NOT defined here.
 * Each feature module owns its own endpoint constants.
 */
export const API_CONFIG = {
  baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
  timeoutMs: env.NEXT_PUBLIC_API_TIMEOUT_MS,
  retry: {
    /** Maximum number of retry attempts for failed requests. */
    maxAttempts: 3,
    /** Delay between retries in milliseconds (exponential back-off is applied per attempt). */
    baseDelayMs: 1000,
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const;

export type ApiConfig = typeof API_CONFIG;
