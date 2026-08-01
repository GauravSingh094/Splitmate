/**
 * Mutex Refresh Queue.
 * Prevents multiple simultaneous 401 token refresh requests when multiple parallel API requests fail.
 */

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

export const refreshQueue = {
  isRefreshing(): boolean {
    return isRefreshing;
  },

  setRefreshing(refreshing: boolean): void {
    isRefreshing = refreshing;
  },

  enqueue(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  },

  processQueue(error: unknown | null, token: string | null = null): void {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else if (token) {
        promise.resolve(token);
      }
    });
    failedQueue = [];
  },
};
