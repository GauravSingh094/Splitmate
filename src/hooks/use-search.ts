'use client';

import { useState } from 'react';

import { useDebounce } from './use-debounce';

export function useSearch(initialQuery = '', delayMs = 300) {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, delayMs);

  return {
    query,
    setQuery,
    debouncedQuery,
    clearSearch: () => setQuery(''),
  };
}
