import { API_CONFIG } from '@/config/api';

/**
 * Appends a path to the API base URL.
 * @example buildApiUrl('/users') → 'http://localhost:8000/users'
 */
export function buildApiUrl(path: string): string {
  const base = API_CONFIG.baseUrl.replace(/\/$/, '');
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalised}`;
}

/**
 * Constructs a URL with typed query parameters.
 * Skips keys with null or undefined values.
 *
 * @example
 * buildUrl('/search', { q: 'coffee', page: 1, tag: null })
 * → '/search?q=coffee&page=1'
 */
export function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | null | undefined>,
): string {
  if (!params) return path;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

/**
 * Extracts a specific query parameter from a URL string.
 * Returns null if the parameter doesn't exist.
 */
export function getQueryParam(url: string, key: string): string | null {
  try {
    const { searchParams } = new URL(url, 'http://placeholder.local');
    return searchParams.get(key);
  } catch {
    return null;
  }
}

/**
 * Returns the origin (protocol + host) from a URL string.
 * @example getOrigin('https://api.example.com/v1/users') → 'https://api.example.com'
 */
export function getOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}
