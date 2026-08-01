/**
 * Generic API response wrapper — matches the FastAPI response shape.
 * All successful responses are wrapped in this envelope.
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

/**
 * Paginated list response.
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  message: string;
  success: boolean;
}

/**
 * Normalised API error shape.
 * All errors are normalised to this structure in the Axios response interceptor.
 */
export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
}

/**
 * Generic cursor-based pagination parameters.
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  cursor?: string;
}

/**
 * Sort direction for list queries.
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Generic sort parameters.
 */
export interface SortParams<T extends string = string> {
  sortBy?: T;
  sortDirection?: SortDirection;
}

/**
 * Common date range filter.
 */
export interface DateRangeFilter {
  from?: string;
  to?: string;
}
