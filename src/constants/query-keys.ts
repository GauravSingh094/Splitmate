/**
 * TanStack Query Key Factory
 *
 * Keys are structured as tuples: [scope, ...qualifiers]
 * This enables precise, type-safe cache invalidation at any level of granularity.
 */

export const QUERY_KEYS = {
  // Auth
  auth: {
    all: () => ['auth'] as const,
    session: () => ['auth', 'session'] as const,
  },

  // Users
  users: {
    all: () => ['users'] as const,
    me: () => ['users', 'me'] as const,
  },

  // Groups
  groups: {
    all: () => ['groups'] as const,
    list: (filters?: Record<string, unknown>) => ['groups', 'list', filters] as const,
    details: () => ['groups', 'detail'] as const,
    detail: (id: string) => ['groups', 'detail', id] as const,
    members: (id: string) => ['groups', 'detail', id, 'members'] as const,
    balances: (id: string) => ['groups', 'detail', id, 'balances'] as const,
  },

  // Members
  members: {
    all: () => ['members'] as const,
    byGroup: (groupId: string) => ['members', 'group', groupId] as const,
  },

  // Expenses
  expenses: {
    all: () => ['expenses'] as const,
    list: (filters?: Record<string, unknown>) => ['expenses', 'list', filters] as const,
    details: () => ['expenses', 'detail'] as const,
    detail: (id: string) => ['expenses', 'detail', id] as const,
  },

  // Balances
  balances: {
    all: () => ['balances'] as const,
    summary: () => ['balances', 'summary'] as const,
    byGroup: (groupId: string) => ['balances', 'group', groupId] as const,
  },

  // Settlements
  settlements: {
    all: () => ['settlements'] as const,
    list: (filters?: Record<string, unknown>) => ['settlements', 'list', filters] as const,
    detail: (id: string) => ['settlements', 'detail', id] as const,
  },

  // Analytics
  analytics: {
    all: () => ['analytics'] as const,
    summary: (groupId?: string) => ['analytics', 'summary', groupId] as const,
  },

  // Notifications
  notifications: {
    all: () => ['notifications'] as const,
    unread: () => ['notifications', 'unread'] as const,
  },

  // Activity
  activity: {
    all: () => ['activity'] as const,
    list: (filters?: Record<string, unknown>) => ['activity', 'list', filters] as const,
  },
} as const;
