import { type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { http } from '@/lib/axios';

/**
 * Typed HTTP service.
 *
 * A thin, generic wrapper around the Axios instance that provides
 * consistent return types and removes the need for `.data` access
 * at the call site.
 *
 * Feature modules should call this service rather than the Axios
 * instance directly, which keeps all request configuration centralised.
 *
 * @example
 * const groups = await HttpService.get<Group[]>('/groups');
 */
export class HttpService {
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await http.get<T>(url, config);
    return response.data;
  }

  static async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await http.post<T>(url, data, config);
    return response.data;
  }

  static async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await http.put<T>(url, data, config);
    return response.data;
  }

  static async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await http.patch<T>(url, data, config);
    return response.data;
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await http.delete<T>(url, config);
    return response.data;
  }
}
