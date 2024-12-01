import { supabase } from '../supabase/client';
import { db } from '../db/instance';
import { UserProfile } from '../../types/user';
import { Client } from '../../types';
import { Developer } from '../../types/developer';
import { Project } from '../../types/project';
import { Property } from '../../types/property';
import { Task } from '../../types';

export class SyncService {
  private static instance: SyncService;
  private subscriptions: { [key: string]: () => void } = {};

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  async initializeRealtime() {
    // Subscribe to all relevant tables
    this.subscribeToTable('users');
    this.subscribeToTable('clients');
    this.subscribeToTable('developers');
    this.subscribeToTable('projects');
    this.subscribeToTable('properties');
    this.subscribeToTable('tasks');
  }

  private subscribeToTable(table: string) {
    const subscription = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
        },
        async (payload) => {
          console.log(`Change received for ${table}:`, payload);
          await this.handleDatabaseChange(table, payload);
        }
      )
      .subscribe();

    this.subscriptions[table] = () => subscription.unsubscribe();
  }

  private async handleDatabaseChange(table: string, payload: any) {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    try {
      switch (eventType) {
        case 'INSERT':
        case 'UPDATE':
          await this.updateLocalDatabase(table, newRecord);
          break;
        case 'DELETE':
          await this.deleteFromLocalDatabase(table, oldRecord.id);
          break;
      }
    } catch (error) {
      console.error(`Error handling ${table} change:`, error);
    }
  }

  private async updateLocalDatabase(table: string, record: any) {
    try {
      switch (table) {
        case 'users':
          await db.users.put(record as UserProfile);
          break;
        case 'clients':
          await db.clients.put(record as Client);
          break;
        case 'developers':
          await db.developers.put(record as Developer);
          break;
        case 'projects':
          await db.projects.put(record as Project);
          break;
        case 'properties':
          await db.properties.put(record as Property);
          break;
        case 'tasks':
          await db.tasks.put(record as Task);
          break;
      }
    } catch (error) {
      console.error(`Error updating ${table} in local database:`, error);
      throw error;
    }
  }

  private async deleteFromLocalDatabase(table: string, id: string) {
    try {
      switch (table) {
        case 'users':
          await db.users.delete(id);
          break;
        case 'clients':
          await db.clients.delete(id);
          break;
        case 'developers':
          await db.developers.delete(id);
          break;
        case 'projects':
          await db.projects.delete(id);
          break;
        case 'properties':
          await db.properties.delete(id);
          break;
        case 'tasks':
          await db.tasks.delete(id);
          break;
      }
    } catch (error) {
      console.error(`Error deleting from ${table} in local database:`, error);
      throw error;
    }
  }

  async syncToCloud<T>(table: string, data: T): Promise<void> {
    try {
      const { error } = await supabase
        .from(table)
        .upsert(data as any, {
          onConflict: 'id',
        });

      if (error) throw error;
    } catch (error) {
      console.error(`Error syncing ${table} to cloud:`, error);
      throw error;
    }
  }

  async syncFromCloud(table: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error syncing ${table} from cloud:`, error);
      throw error;
    }
  }

  cleanup() {
    // Unsubscribe from all channels
    Object.values(this.subscriptions).forEach(unsubscribe => unsubscribe());
    this.subscriptions = {};
  }
}

export const syncService = SyncService.getInstance();