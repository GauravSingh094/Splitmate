import { type MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Splitmate',
    short_name: 'Splitmate',
    description: 'Enterprise progressive web app for splitting expenses easily.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#09090b',
    orientation: 'portrait-primary',
    categories: ['finance', 'productivity'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Dashboard',
        short_name: 'Dashboard',
        description: 'View your net balance',
        url: '/dashboard',
      },
      {
        name: 'Add Expense',
        short_name: 'Expense',
        description: 'Create a new expense',
        url: '/expenses/new',
      },
      {
        name: 'Groups',
        short_name: 'Groups',
        description: 'View your groups',
        url: '/groups',
      },
    ],
  };
}
