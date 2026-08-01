type NetworkListener = (isOnline: boolean, isSlow: boolean) => void;

class NetworkStatusManager {
  private listeners: Set<NetworkListener> = new Set();
  private onlineState: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private slowState: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
      this.checkConnectionQuality();
    }
  }

  private handleOnline = () => {
    this.onlineState = true;
    this.checkConnectionQuality();
    this.notify();
  };

  private handleOffline = () => {
    this.onlineState = false;
    this.notify();
  };

  private checkConnectionQuality() {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
      this.slowState = conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g';
    }
  }

  get isOnline(): boolean {
    return this.onlineState;
  }

  get isSlow(): boolean {
    return this.slowState;
  }

  subscribe(listener: NetworkListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.onlineState, this.slowState));
  }
}

export const networkStatus = new NetworkStatusManager();
