import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import { API_CONFIG } from '@/config/api';
import { AppApiError } from '@/lib/api-error';
import { refreshQueue } from '@/lib/auth/refresh-queue';
import { tokenStorage } from '@/lib/auth/token-storage';

/**
 * Enterprise Axios Instance.
 * - BaseURL configured from validated env (https://apiv1.splitmate.page/api/v1)
 * - Automatic Bearer token injection
 * - Request ID tracking (X-Request-ID)
 * - 401 Automatic Token Refresh with Mutex Queueing
 * - Normalized AppApiError transformation
 * - withCredentials: false (prevents browser CORS blocks on error responses)
 */
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeoutMs,
  headers: { ...API_CONFIG.headers },
  withCredentials: false,
});

// ---- Request Interceptor ----------------------------------------
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Inject Bearer token if available
    const token = tokenStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Inject unique Request ID for tracing
    if (config.headers && !config.headers['X-Request-ID']) {
      config.headers['X-Request-ID'] =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ---- Response Interceptor ---------------------------------------
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle Network Offline / Disconnected
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return Promise.reject(
        new AppApiError(
          'You are currently offline. Please check your internet connection.',
          'OFFLINE',
          0,
        ),
      );
    }

    // Handle Request Timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(
        new AppApiError('Request timed out. Please try again.', 'TIMEOUT', 408),
      );
    }

    // Handle 401 Unauthorized with Mutex Refresh Queue.
    const isAuthEndpoint =
      originalRequest?.url?.startsWith('/auth/') || originalRequest?.url?.includes('/auth/');

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        tokenStorage.clearTokens();
        return Promise.reject(
          new AppApiError('Session expired. Please sign in again.', 'UNAUTHORIZED', 401),
        );
      }

      if (refreshQueue.isRefreshing()) {
        try {
          const newToken = await refreshQueue.enqueue();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshErr) {
          return Promise.reject(refreshErr);
        }
      }

      refreshQueue.setRefreshing(true);

      try {
        const response = await axios.post<{
          access_token: string;
          refresh_token: string;
          token_type: string;
        }>(
          `${API_CONFIG.baseUrl}/auth/refresh`,
          { refresh_token: refreshToken },
          { withCredentials: false },
        );

        const { access_token, refresh_token } = response.data;
        tokenStorage.setAccessToken(access_token);
        tokenStorage.setRefreshToken(refresh_token);
        refreshQueue.processQueue(null, access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        tokenStorage.clearTokens();
        refreshQueue.processQueue(refreshError, null);
        return Promise.reject(
          new AppApiError('Session expired. Please sign in again.', 'UNAUTHORIZED', 401),
        );
      } finally {
        refreshQueue.setRefreshing(false);
      }
    }

    // Map all backend errors to AppApiError
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as {
        message?: string;
        detail?: string | Array<{ msg?: string; message?: string }>;
        details?: unknown;
      };

      let message = 'An unexpected error occurred';
      if (typeof data?.message === 'string') {
        message = data.message;
      } else if (typeof data?.detail === 'string') {
        message = data.detail;
      } else if (Array.isArray(data?.detail)) {
        message = data.detail
          .map((d) => (typeof d === 'string' ? d : d?.msg || d?.message || JSON.stringify(d)))
          .join(', ');
      } else if (data?.detail && typeof data.detail === 'object') {
        message = JSON.stringify(data.detail);
      }

      return Promise.reject(AppApiError.fromStatus(status, message));
    }

    return Promise.reject(
      new AppApiError(
        error.message ?? 'Network error occurred',
        'NETWORK_ERROR',
        0,
        undefined,
        error,
      ),
    );
  },
);

export { axiosInstance as http };
export type { AxiosError };
