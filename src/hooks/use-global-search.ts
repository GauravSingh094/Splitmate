import { useQuery } from '@tanstack/react-query';

import { GroupRepository } from '@/features/groups/repository';
import { useDebounce } from '@/hooks/use-debounce';

export interface GlobalSearchResult {
  id: string;
  type: 'group' | 'expense' | 'settlement' | 'notification';
  title: string;
  subtitle: string;
  href: string;
}

/**
 * Searches across Groups.
 */
export function useGlobalSearch(query: string) {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ['global-search', debouncedQuery],
    queryFn: async (): Promise<GlobalSearchResult[]> => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) return [];

      const q = debouncedQuery.toLowerCase();

      try {
        const groups = await GroupRepository.getGroups();
        const results: GlobalSearchResult[] = [];

        groups.forEach((g) => {
          if (g.name.toLowerCase().includes(q)) {
            results.push({
              id: g.id,
              type: 'group',
              title: g.name,
              subtitle: `${g.members_count} members • ${g.default_currency}`,
              href: `/groups/${g.id}`,
            });
          }
        });

        return results;
      } catch {
        return [];
      }
    },
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 10000,
  });
}
