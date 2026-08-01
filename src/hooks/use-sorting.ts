'use client';

import { useCallback, useState } from 'react';

import type { SortDirection, SortParams } from '@/types/api';

export function useSorting<T extends string>(
  initialSortBy?: T,
  initialDirection: SortDirection = 'asc',
) {
  const [sortBy, setSortBy] = useState<T | undefined>(initialSortBy);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialDirection);

  const toggleSort = useCallback(
    (field: T) => {
      if (sortBy === field) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(field);
        setSortDirection('asc');
      }
    },
    [sortBy],
  );

  const sortParams: SortParams<T> = {
    sortBy,
    sortDirection,
  };

  return {
    sortBy,
    sortDirection,
    setSortBy,
    setSortDirection,
    toggleSort,
    sortParams,
  };
}
