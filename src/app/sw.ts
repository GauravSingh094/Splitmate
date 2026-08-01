/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker';
import {
  Serwist,
  NetworkOnly,
  NetworkFirst,
  type PrecacheEntry,
  type SerwistGlobalConfig,
} from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // 1. NEVER cache authentication endpoints for security
    {
      matcher: ({ url }) => url.pathname.includes('/auth/'),
      handler: new NetworkOnly(),
    },
    // 2. Cache API Responses (Network First for fresh data, fallback to cache for offline)
    {
      matcher: ({ url }) => url.pathname.startsWith('/api/') || url.pathname.includes('/api/v1/'),
      handler: new NetworkFirst({
        cacheName: 'splitmate-api-cache',
      }),
    },
    // 3. Static Assets & Next.js built-in caching
    ...defaultCache,
  ],
});

serwist.addEventListeners();

// Future Push Notification Hook
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title || 'Splitmate', {
        body: data.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-maskable.png',
        data: data.url,
      }),
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.notification.data) {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === event.notification.data && 'focus' in client) return client.focus();
        }
        if (self.clients.openWindow) return self.clients.openWindow(event.notification.data);
      }),
    );
  }
});
