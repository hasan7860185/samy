import { SyncData } from './types';
import { uploadData } from './api';
import { SYNC_CONFIG } from './config';

const QUEUE_KEY = 'sync_queue';

interface QueueItem {
  id: string;
  data: SyncData;
  timestamp: string;
  attempts: number;
}

export class OfflineStorage {
  static async queueSync(data: SyncData): Promise<void> {
    const queue = await this.getQueue();
    
    // Enforce queue size limit
    if (queue.length >= SYNC_CONFIG.OFFLINE_STORAGE.MAX_QUEUE_SIZE) {
      queue.shift(); // Remove oldest item
    }
    
    const item: QueueItem = {
      id: crypto.randomUUID(),
      data,
      timestamp: new Date().toISOString(),
      attempts: 0
    };

    queue.push(item);
    await this.saveQueue(queue);
  }

  static async processSyncQueue(): Promise<void> {
    if (!navigator.onLine) return;

    const queue = await this.getQueue();
    if (queue.length === 0) return;

    const updatedQueue = [];
    
    for (const item of queue) {
      try {
        await this.syncItem(item);
      } catch (error) {
        if (item.attempts < SYNC_CONFIG.RETRY.MAX_ATTEMPTS) {
          updatedQueue.push({
            ...item,
            attempts: item.attempts + 1
          });
        }
      }
    }

    await this.saveQueue(updatedQueue);
  }

  private static async getQueue(): Promise<QueueItem[]> {
    try {
      const data = localStorage.getItem(QUEUE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading sync queue:', error);
      return [];
    }
  }

  private static async saveQueue(queue: QueueItem[]): Promise<void> {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } catch (error) {
      console.error('Error saving sync queue:', error);
    }
  }

  private static async syncItem(item: QueueItem): Promise<void> {
    await uploadData(item.data);
  }
}