import type { MetadataRoute } from 'next';

import { SITE_CONFIG } from '@/config/site';
import { ROUTES } from '@/constants/routes';

/**
 * Static sitemap — dynamic entries (groups, expenses) will be added
 * in their respective feature modules via generateSitemaps().
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  return [
    {
      url: `${baseUrl}${ROUTES.home}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}${ROUTES.pricing}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.about}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}${ROUTES.blog}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}${ROUTES.contact}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
