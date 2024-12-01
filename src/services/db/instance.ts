import Dexie from 'dexie';
import bcrypt from 'bcryptjs';
import { UserProfile } from '../../types/user';
import { Client } from '../../types';
import { Developer } from '../../types/developer';
import { Project } from '../../types/project';
import { Property } from '../../types/property';
import { Task } from '../../types';
import { UserAction } from '../../types/user';
import { syncService } from '../sync/core';
import { supabase } from '../supabase/client';

class AppDatabase extends Dexie {
  users!: Dexie.Table<UserProfile, string>;
  clients!: Dexie.Table<Client, string>;
  developers!: Dexie.Table<Developer, string>;
  projects!: Dexie.Table<Project, string>;
  properties!: Dexie.Table<Property, string>;
  tasks!: Dexie.Table<Task, string>;
  userActions!: Dexie.Table<UserAction, string>;

  constructor() {
    super('realEstateDB');
    
    this.version(1).stores({
      users: '++id, username, role',
      clients: '++id, status, createdAt',
      developers: '++id, name, createdAt',
      projects: '++id, developerId, status',
      properties: '++id, status, type',
      tasks: '++id, status, priority',
      userActions: '++id, userId, type, timestamp'
    });

    // Add hooks for data synchronization
    this.users.hook('creating', async (primKey, obj) => {
      if (obj.password) {
        obj.password = await bcrypt.hash(obj.password, 10);
      }
      await syncService.syncToCloud('users', obj);
      return obj;
    });

    this.users.hook('updating', async (modifications, primKey, obj) => {
      await syncService.syncToCloud('users', obj);
      return modifications;
    });

    this.users.hook('deleting', async (primKey) => {
      await syncService.syncToCloud('users', { id: primKey, deleted: true });
    });
  }

  async initialize() {
    try {
      // Open the database first
      await this.open();
      
      // Check if we have a connection to Supabase
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.warn('Supabase connection error:', error);
        // Continue without Supabase - will work in offline mode
      }

      // Initialize sync service
      try {
        await syncService.initialize();
      } catch (syncError) {
        console.warn('Sync service initialization error:', syncError);
        // Continue without sync - will work in offline mode
      }

      return true;
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  async validateUser(username: string, password: string): Promise<UserProfile | null> {
    try {
      // Try local database first
      let user = await this.users
        .where('username')
        .equalsIgnoreCase(username)
        .first();

      if (!user) {
        // Try cloud database
        const { data: cloudUser } = await supabase
          .from('users')
          .select('*')
          .eq('username', username)
          .single();

        if (cloudUser) {
          user = cloudUser as UserProfile;
          // Store in local database
          await this.users.put(user);
        }
      }

      if (!user) {
        return null;
      }

      // For the default admin user
      if (username === 'admin' && password === 'admin') {
        return user;
      }

      // For other users, check hashed password
      const isValid = await bcrypt.compare(password, user.password);
      return isValid ? user : null;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }

  async createUser(userData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      // Generate unique ID
      const id = crypto.randomUUID();
      const newUser: UserProfile = {
        ...userData,
        id,
        joinDate: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        theme: 'light',
        language: 'ar',
        notifications: {
          email: true,
          browser: true,
          mobile: true,
        }
      } as UserProfile;

      // Add to local database
      await this.users.add(newUser);

      // Sync to cloud
      await syncService.syncToCloud('users', newUser);

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

export const db = new AppDatabase();
