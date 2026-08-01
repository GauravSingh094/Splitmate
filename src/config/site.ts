import { APP_CONFIG } from './app';

/**
 * Site-wide SEO and metadata configuration.
 * Used by the root layout and as defaults for all pages.
 */
export const SITE_CONFIG = {
  name: APP_CONFIG.name,
  title: {
    default: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  url: APP_CONFIG.url,
  ogImage: `${APP_CONFIG.url}/og.png`,
  locale: 'en_US',
  themeColor: {
    light: '#ffffff',
    dark: '#0a0a0a',
  },
  keywords: [
    'expense sharing',
    'bill splitting',
    'money management',
    'AI finance',
    'group expenses',
    'settle up',
  ],
} as const;

export type SiteConfig = typeof SITE_CONFIG;
