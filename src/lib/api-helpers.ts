import type { PaginationParams, SortParams } from '@/types/api';

/**
 * Normalizes pagination parameters into standard query params object.
 */
export function toPaginationParams(params?: PaginationParams): Record<string, string | number> {
  return {
    page: params?.page ?? 1,
    page_size: params?.pageSize ?? 20,
    ...(params?.cursor ? { cursor: params.cursor } : {}),
  };
}

/**
 * Normalizes sorting parameters into backend query params.
 */
export function toSortParams<T extends string>(params?: SortParams<T>): Record<string, string> {
  if (!params?.sortBy) return {};
  return {
    sort_by: params.sortBy,
    sort_direction: params.sortDirection ?? 'asc',
  };
}

/**
 * Converts a JS object into FormData for multipart file uploads.
 */
export function createFormData(data: Record<string, unknown>): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(key, item);
        } else {
          formData.append(key, JSON.stringify(item));
        }
      });
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
}

/**
 * Initiates a browser download from a binary Blob or ArrayBuffer.
 */
export function downloadFile(
  data: Blob | ArrayBuffer,
  fileName: string,
  mimeType = 'application/octet-stream',
): void {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
