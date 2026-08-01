# Splitmate PWA Architecture

Splitmate is a fully progressive Web Application (PWA) designed for enterprise reliability. It provides native-app-like installation, rich offline functionality, seamless background synchronization, and aggressive caching.

## Architecture & Technology Stack

The PWA is built on top of the Next.js App Router using `@serwist/next`, a modern successor to `next-pwa` that wraps Google's Workbox.

- **Service Worker Initialization:** Controlled via `next.config.ts` using `withSerwist()`.
- **Service Worker Runtime:** Hosted in `src/app/sw.ts`.
- **Manifest:** Generated dynamically via Next.js metadata API at `src/app/manifest.ts`.

## Cache Strategy

Caching is optimized for a balance of speed and freshness:

1. **Static Assets, Fonts, & Scripts** (`_next/static/`): `CacheFirst` strategy. These are highly immutable.
2. **Images**: `StaleWhileRevalidate` strategy. Images load instantly from cache but update in the background.
3. **Application API Requests** (`/api/v1/*`): `NetworkFirst` strategy. The app attempts to fetch the absolute latest data from the backend. If the user is offline or the network fails, it falls back to the local `splitmate-api-cache`.
4. **Authentication Endpoints** (`/api/v1/auth/*`): `NetworkOnly` strategy. These are explicitly **excluded** from all caching layers to prevent exposing JWTs or sensitive session states offline.

## Offline Background Sync

Splitmate features a robust Offline Mutation Queue to allow the app to function even when disconnected.

### `OfflineMutationQueue` (IndexedDB)
Located at `src/lib/offline/mutation-queue.ts`, the queue intercepts data mutations (like creating an expense or updating a group) when the user is offline.

- **Storage Layer**: It utilizes `IndexedDB` (via the `idb` library) instead of `localStorage` so that both the React UI Thread and the background Service Worker can access it.
- **Queue Replay**: When the `networkStatus` detects the device is back online, it fires `replayQueue()`. The queue re-sends each stored `POST`, `PUT`, `PATCH`, or `DELETE` request in chronological order of creation.
- **Error Handling**: Hard failures (like 400 Bad Request) drop the mutation to prevent eternal loops, while Network Failures preserve the queue and pause execution until the next connection.

## Update Management

Updates are managed gracefully to prevent interrupting active user sessions.

1. **Silent Download**: The browser downloads the new Service Worker in the background.
2. **Update Toast**: When the new worker is fully downloaded and in the `installed` phase, `src/components/pwa/update-toast.tsx` displays a non-intrusive prompt ("New version available").
3. **Refresh**: When the user clicks "Refresh", the app sends a `SKIP_WAITING` message to the Service Worker, activating it immediately, and reloads the page.

## Installability

The application meets all criteria for "Add to Homescreen" (A2HS):
- Standard (`192x192`, `512x512`) and `maskable` adaptive icons.
- Application shortcuts for rapid navigation (Dashboard, Add Expense, Groups).
- `display: standalone` for an immersive app experience without browser chrome.
- A custom React component (`src/components/pwa/install-prompt.tsx`) intelligently prompts the user to install the app based on the `beforeinstallprompt` event.

## Future Push Notification Integration

Client-side scaffolding for push notifications is located at `src/lib/pwa/push-notifications.ts`. It provides utilities to:
1. Request notification permissions.
2. Subscribe the device to the Push Manager using a backend-provided VAPID key.
3. The `sw.ts` already contains hooks for `push` events and `notificationclick` events to route users back into the app upon tapping a notification.
