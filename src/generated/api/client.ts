import { http } from '@/lib/axios';
import type { paths } from './types';

/**
 * ApiClient — generated-compatible typed wrapper over Axios for Splito OpenAPI endpoints.
 */
export const generatedApiClient = {
  async get<P extends keyof paths>(url: P, config?: Parameters<typeof http.get>[1]) {
    return http.get(url as string, config);
  },

  async post<P extends keyof paths>(
    url: P,
    data?: unknown,
    config?: Parameters<typeof http.post>[2],
  ) {
    return http.post(url as string, data, config);
  },

  async patch<P extends keyof paths>(
    url: P,
    data?: unknown,
    config?: Parameters<typeof http.patch>[2],
  ) {
    return http.patch(url as string, data, config);
  },

  async delete<P extends keyof paths>(url: P, config?: Parameters<typeof http.delete>[1]) {
    return http.delete(url as string, config);
  },
};
