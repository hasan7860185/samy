import { SyncData } from './types';
import { NetworkError } from './errors';
import { SYNC_CONFIG } from './config';

interface QueueItem {
  id: string;
  data: SyncData;
  timestamp: string;
  retryCount: number;
}

class SyncQueue {
  private queue: QueueItem[] = [];
  private isProcessing = false;

  async add(data: SyncData): Promise<void> {
    const item: QueueItem = {
      id: crypto.randomUUID(),
      data,
      timestamp: new Date().toISOString(),
      retryCount: 0
    };

    this.queue.push(item);
    this.persistQueue();

    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  async processQueue(): Promise<void> {
    if (this.isProcessing || !navigator.onLine || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      const item = this.queue[0];
      await this.processItem(item);
      this.queue.shift();
      this.persistQueue();
    } catch (error) {
      const item = this.queue[0];
      if (item.retryCount < SYNC_CONFIG.RETRY.MAX_ATTEMPTS) {
        item.retryCount++;
        this.persistQueue();
        
        // Exponential backoff
        const delay = SYNC_CONFIG.RETRY.INITIAL_DELAY_MS * Math.pow(2, item.retryCount - 1);
        setTimeout(() => this.processQueue(), delay);
      } else {
        // Remove failed item after max retries
        this.queue.shift();
        this.persistQueue();
        console.error('Max retries reached for sync item:', item.id);
      }
    } finally {
      this.isProcessing = false;
      
      // Process next item if queue not empty
      if (this.queue.length > 0) {
        setTimeout(() => this.processQueue(), 1000);
      }
    }
  }

  private async processItem(item: QueueItem): Promise<void> {
    try {
      const response = await fetch(`${SYNC_CONFIG.API_BASE}/store-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item.data)
      });

      if (!response.ok) {
        throw new NetworkError(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      throw new NetworkError('Failed to process sync item', error instanceof Error ? error : undefined);
    }
  }

  private persistQueue(): void {
    try {
      localStorage.setItem('sync_queue', JSON.stringify(this.queue));
    } catch (error) {
      console.error('Error persisting sync queue:', error);
    }
  }

  loadPersistedQueue(): void {
    try {
      const data = localStorage.getItem('sync_queue');
      if (data) {
        this.queue = JSON.parse(data);
        if (this.queue.length > 0) {
          this.processQueue();
        }
      }
    } catch (error) {
      console.error('Error loading persisted sync queue:', error);
    }
  }
}

export const syncQueue = new SyncQueue();

// Load persisted queue on startup
if (typeof window !== 'undefined') {
  syncQueue.loadPersistedQueue();
}