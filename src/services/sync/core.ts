import { NetworkError, SyncError } from './errors';
import { connectivityMonitor } from './connectivity';
import { syncQueue } from './queue';
import { getAllLocalData, updateLocalData } from './db';
import { uploadData, fetchData } from './api';
import { getStoredUsers, storeUsers } from '../auth/storage';
import { db } from '../db/instance';
import type { SyncData, SyncResult } from './types';

export class SyncManager {
  private static instance: SyncManager;
  private isSyncing = false;

  private constructor() {
    // Initialize sync interval
    setInterval(() => this.syncWithCloud(), 5 * 60 * 1000); // Sync every 5 minutes
  }

  static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }

  private async syncWithCloud(): Promise<void> {
    if (!connectivityMonitor.getStatus() || this.isSyncing) {
      return;
    }

    try {
      // Sync users first
      const localUsers = await db.users.toArray();
      const cloudUsers = getStoredUsers();

      // Merge users, preferring cloud data for conflicts
      const mergedUsers = this.mergeData(localUsers, cloudUsers, 'id');
      
      // Update both storages
      await db.users.bulkPut(mergedUsers);
      storeUsers(mergedUsers);

    } catch (error) {
      console.error('Error syncing with cloud:', error);
    }
  }

  private mergeData<T extends { id: string }>(local: T[], cloud: T[], key: keyof T): T[] {
    const merged = new Map<string, T>();
    
    // Add all local items
    local.forEach(item => merged.set(item.id, item));
    
    // Override with cloud items (cloud takes precedence)
    cloud.forEach(item => merged.set(item.id, item));
    
    return Array.from(merged.values());
  }

  async syncToCloud(userId: string): Promise<SyncResult> {
    if (this.isSyncing) {
      return { success: false, error: new SyncError('Sync already in progress') };
    }

    if (!connectivityMonitor.getStatus()) {
      await this.handleOfflineSync(userId);
      return { success: false, error: new NetworkError('No internet connection') };
    }

    this.isSyncing = true;

    try {
      const data = await getAllLocalData();
      const syncData: SyncData = {
        userId,
        data,
        timestamp: new Date().toISOString()
      };

      const result = await uploadData(syncData);
      
      // Update cloud storage
      if (result.success && result.data?.users) {
        storeUsers(result.data.users);
      }
      
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof NetworkError) {
        await this.handleOfflineSync(userId);
      }
      return { 
        success: false, 
        error: error instanceof Error ? error : new SyncError('Unknown error occurred')
      };
    } finally {
      this.isSyncing = false;
    }
  }

  async syncFromCloud(userId: string): Promise<SyncResult> {
    if (this.isSyncing) {
      return { success: false, error: new SyncError('Sync already in progress') };
    }

    if (!connectivityMonitor.getStatus()) {
      return { success: false, error: new NetworkError('No internet connection') };
    }

    this.isSyncing = true;

    try {
      const response = await fetchData(userId);
      
      if (!response.data) {
        return { success: false };
      }

      await updateLocalData(response.data);
      
      // Update cloud storage
      if (response.data.users) {
        storeUsers(response.data.users);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error : new SyncError('Unknown error occurred')
      };
    } finally {
      this.isSyncing = false;
    }
  }

  private async handleOfflineSync(userId: string): Promise<void> {
    const data = await getAllLocalData();
    await syncQueue.add({
      userId,
      data,
      timestamp: new Date().toISOString()
    });
  }
}

export const syncManager = SyncManager.getInstance();