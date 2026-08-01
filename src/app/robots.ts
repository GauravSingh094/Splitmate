import type { MetadataRoute } from 'next';

import { SITE_CONFIG } from '@/config/site';
import { ROUTES } from '@/constants/routes';

/**
 * Robots.txt configuration.
 * Private/authenticated routes are disallowed for crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          ROUTES.dashboard.root + '/',
          ROUTES.auth.signIn,
          ROUTES.auth.signUp,
          ROUTES.auth.forgotPassword,
          ROUTES.auth.resetPassword,
          ROUTES.auth.verifyEmail,
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
