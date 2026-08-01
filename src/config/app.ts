/**
 * Application-level constants.
 * All values are derived from env — no hardcoding.
 */
export const APP_CONFIG = {
  name: 'Splitmate',
  tagline: 'Split smarter. Settle faster.',
  description: 'AI-powered expense sharing that tracks, splits, and settles bills — effortlessly.',
  version: process.env['NEXT_PUBLIC_APP_VERSION'] ?? '0.1.0',
  url: process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000',
  author: {
    name: 'Splitmate Team',
    email: 'hello@splitmate.page',
    url: 'https://splitmate.page',
  },
  social: {
    twitter: 'https://twitter.com/splitmate',
    github: 'https://github.com/splitmate',
  },
  support: {
    email: 'support@splitmate.page',
    docs: 'https://docs.splitmate.page',
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
