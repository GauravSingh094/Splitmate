'use client';

import { useQueryState } from 'nuqs';
import { urlStateParsers } from '@/lib/url-state';

/**
 * Syncs a search query input directly with the URL search param `q`.
 */
export function useSearchUrlState() {
  return useQueryState('q', urlStateParsers.search);
}

/**
 * Syncs page number and page size with URL search params `page` and `pageSize`.
 */
export function usePaginationUrlState() {
  const [page, setPage] = useQueryState('page', urlStateParsers.page);
  const [pageSize, setPageSize] = useQueryState('pageSize', urlStateParsers.pageSize);

  return { page, setPage, pageSize, setPageSize };
}

/**
 * Syncs sorting state with URL search params `sortBy` and `sortDirection`.
 */
export function useSortingUrlState() {
  const [sortBy, setSortBy] = useQueryState('sortBy', urlStateParsers.sortBy);
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    urlStateParsers.sortDirection,
  );

  return { sortBy, setSortBy, sortDirection, setSortDirection };
}
