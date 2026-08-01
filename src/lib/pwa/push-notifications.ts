/**
 * Push Notification Service (Scaffolding)
 * Handles registering the device with the backend for Push Notifications.
 */

export async function requestPushPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('[PWA] This browser does not support desktop notifications.');
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  return permission;
}

export async function subscribeToPushNotifications(
  publicVapidKey: string,
): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('[PWA] Push messaging is not supported.');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    // Check if already subscribed
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      return existingSubscription;
    }

    // Convert VAPID key to Uint8Array
    const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);

    // Subscribe
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
    return subscription;
  } catch (error) {
    console.error('[PWA] Failed to subscribe to push notifications:', error);
    return null;
  }
}

/**
 * Utility to convert the base64 public VAPID key to a Uint8Array
 */
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
