import { openDB, type IDBPDatabase } from 'idb';
import { networkStatus } from './network-status';

export interface QueuedMutation {
  id: string;
  endpoint: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  payload?: unknown;
  createdAt: number;
}

const DB_NAME = 'splito-offline-db';
const STORE_NAME = 'mutations';

class OfflineMutationQueue {
  private dbPromise: Promise<IDBPDatabase | null>;

  constructor() {
    this.dbPromise = this.initDB();

    // Subscribe to online status to replay queue in the UI thread
    if (typeof window !== 'undefined') {
      networkStatus.subscribe((isOnline) => {
        if (isOnline) {
          this.replayQueue();
        }
      });
    }
  }

  private async initDB() {
    // Only initialize DB in browser or Service Worker context
    if (typeof window === 'undefined' && typeof self === 'undefined') return null;
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  }

  async enqueue(mutation: Omit<QueuedMutation, 'id' | 'createdAt'>): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;

    const item: QueuedMutation = {
      ...mutation,
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36),
      createdAt: Date.now(),
    };

    await db.put(STORE_NAME, item);
  }

  async getPendingMutations(): Promise<QueuedMutation[]> {
    const db = await this.dbPromise;
    if (!db) return [];
    return db.getAll(STORE_NAME);
  }

  async replayQueue(): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;

    const itemsToProcess = await this.getPendingMutations();
    if (itemsToProcess.length === 0) return;

    // Process sequentially based on insertion order
    for (const item of itemsToProcess.sort((a, b) => a.createdAt - b.createdAt)) {
      try {
        const res = await fetch(item.endpoint, {
          method: item.method,
          headers: { 'Content-Type': 'application/json' },
          body: item.payload ? JSON.stringify(item.payload) : undefined,
        });

        if (res.ok || res.status >= 400) {
          // Remove from queue on success OR definitive failure (like 400 Bad Request)
          // We don't want to eternally loop on a malformed request
          await db.delete(STORE_NAME, item.id);
        }
      } catch (err) {
        console.warn(`[Offline Queue] Network failed while replaying ${item.id}:`, err);
        // Break on network error to preserve order for next connection
        break;
      }
    }
  }
}

export const offlineMutationQueue = new OfflineMutationQueue();
