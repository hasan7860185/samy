import { SYNC_CONFIG } from './config';

class ConnectivityMonitor {
  private static instance: ConnectivityMonitor;
  private isOnline: boolean = navigator.onLine;
  private listeners: Set<(online: boolean) => void> = new Set();

  private constructor() {
    window.addEventListener('online', () => this.updateStatus(true));
    window.addEventListener('offline', () => this.updateStatus(false));
    
    // Periodic connectivity check
    setInterval(() => this.checkConnectivity(), SYNC_CONFIG.CONNECTIVITY_CHECK.INTERVAL_MS);
  }

  static getInstance(): ConnectivityMonitor {
    if (!ConnectivityMonitor.instance) {
      ConnectivityMonitor.instance = new ConnectivityMonitor();
    }
    return ConnectivityMonitor.instance;
  }

  async checkConnectivity(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(), 
        SYNC_CONFIG.CONNECTIVITY_CHECK.TIMEOUT_MS
      );

      const response = await fetch(`${SYNC_CONFIG.API_BASE}/health`, {
        method: 'HEAD',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const online = response.ok;
      this.updateStatus(online);
      return online;
    } catch {
      this.updateStatus(false);
      return false;
    }
  }

  private updateStatus(online: boolean) {
    if (this.isOnline !== online) {
      this.isOnline = online;
      this.notifyListeners();
    }
  }

  addListener(callback: (online: boolean) => void) {
    this.listeners.add(callback);
    // Immediately notify new listener of current status
    callback(this.isOnline);
  }

  removeListener(callback: (online: boolean) => void) {
    this.listeners.delete(callback);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.isOnline));
  }

  getStatus(): boolean {
    return this.isOnline;
  }
}

export const connectivityMonitor = ConnectivityMonitor.getInstance();