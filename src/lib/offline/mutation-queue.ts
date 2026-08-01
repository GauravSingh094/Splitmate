import { networkStatus } from './network-status';

export interface QueuedMutation {
  id: string;
  endpoint: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  payload?: unknown;
  createdAt: number;
}

const STORAGE_KEY = 'splito_queued_mutations';

class OfflineMutationQueue {
  private queue: QueuedMutation[] = [];

  constructor() {
    this.loadFromStorage();
    if (typeof window !== 'undefined') {
      networkStatus.subscribe((isOnline) => {
        if (isOnline) {
          this.replayQueue();
        }
      });
    }
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch {
      this.queue = [];
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.queue));
    } catch (e) {
      console.warn('[Offline Queue] Failed to save queued mutation:', e);
    }
  }

  enqueue(mutation: Omit<QueuedMutation, 'id' | 'createdAt'>): void {
    const item: QueuedMutation = {
      ...mutation,
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36),
      createdAt: Date.now(),
    };
    this.queue.push(item);
    this.saveToStorage();
  }

  getPendingMutations(): QueuedMutation[] {
    return [...this.queue];
  }

  async replayQueue(): Promise<void> {
    if (this.queue.length === 0) return;

    const itemsToProcess = [...this.queue];
    this.queue = [];
    this.saveToStorage();

    for (const item of itemsToProcess) {
      try {
        // Replay request using global fetch/axios
        await fetch(item.endpoint, {
          method: item.method,
          headers: { 'Content-Type': 'application/json' },
          body: item.payload ? JSON.stringify(item.payload) : undefined,
        });
      } catch (err) {
        console.warn(`[Offline Queue] Failed to replay mutation ${item.id}:`, err);
        // Re-enqueue failed mutations for next reconnect
        this.queue.push(item);
        this.saveToStorage();
      }
    }
  }
}

export const offlineMutationQueue = new OfflineMutationQueue();
