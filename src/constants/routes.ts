/**
 * Type-safe application route constants.
 *
 * All navigation paths are defined here. Features reference these
 * constants rather than hard-coding strings, making global renames trivial.
 *
 * NOTE: The (dashboard) route group is a Next.js layout group — it does NOT
 * appear in the URL. Routes are /overview, /groups, etc.
 */
export const ROUTES = {
  // Marketing
  home: '/',
  pricing: '/pricing',
  about: '/about',
  blog: '/blog',
  contact: '/contact',

  // Auth
  auth: {
    signIn: '/login',
    signUp: '/register',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    verifyEmail: '/verify-email',
    verifyEmailPending: '/verify-email-pending',
  },

  // Dashboard (authenticated) — no /dashboard prefix, uses (dashboard) route group
  dashboard: {
    root: '/overview',
    home: '/overview',
    overview: '/overview',
    groups: '/groups',
    group: (id: string) => `/groups/${id}` as const,
    groupExpenses: (groupId: string) => `/groups/${groupId}/expenses` as const,
    newExpense: (groupId: string) => `/groups/${groupId}/expenses/new` as const,
    expenses: '/expenses',
    expense: (id: string) => `/expenses/${id}` as const,
    editExpense: (id: string) => `/expenses/${id}/edit` as const,
    settlements: '/settlements',
    activity: '/activity',
    analytics: '/analytics',
    notifications: '/notifications',
    profile: '/profile',
    settings: {
      root: '/settings',
      profile: '/settings/profile',
      notifications: '/settings/notifications',
      billing: '/settings/billing',
    },
  },

  // API routes (internal Next.js)
  api: {
    health: '/api/health',
  },
} as const;

export type Routes = typeof ROUTES;
