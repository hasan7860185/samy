import Dexie from 'dexie';
import bcrypt from 'bcryptjs';
import { UserProfile } from '../../types/user';
import { Client } from '../../types';
import { Developer } from '../../types/developer';
import { Project } from '../../types/project';
import { Property } from '../../types/property';
import { Task } from '../../types';
import { UserAction } from '../performance/types';
import { getStoredUsers, storeUsers } from '../auth/storage';

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

    // Add hooks for data validation
    this.users.hook('creating', async (primKey, obj) => {
      // Hash password before storing
      if (obj.password) {
        obj.password = await bcrypt.hash(obj.password, 10);
      }
      return obj;
    });
  }

  async initialize() {
    try {
      // Check if database exists
      const dbExists = await this.users.count();
      
      if (dbExists === 0) {
        console.log('Creating new database...');
        
        // Create default admin user
        const defaultAdmin: UserProfile = {
          id: '1',
          username: 'admin',
          password: 'admin', // Will be hashed during creation
          email: 'admin@example.com',
          fullName: 'مدير النظام',
          role: 'admin',
          phone: '0501234567',
          department: 'الإدارة',
          joinDate: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          theme: 'light',
          language: 'ar',
          notifications: {
            email: true,
            browser: true,
            mobile: true,
          }
        };

        await this.users.add(defaultAdmin);
        storeUsers([defaultAdmin]);
        
        console.log('Default admin user created successfully');
      } else {
        // Sync with cloud storage
        const cloudUsers = getStoredUsers();
        if (cloudUsers.length > 0) {
          await this.users.bulkPut(cloudUsers);
        }
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  async validateUser(username: string, password: string): Promise<UserProfile | null> {
    try {
      const user = await this.users
        .where('username')
        .equalsIgnoreCase(username)
        .first();

      if (!user) {
        return null;
      }

      // For the default admin user
      if (username === 'admin' && password === 'admin') {
        return user;
      }

      // For other users, check hashed password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return null;
      }

      // Update last active timestamp
      await this.users.update(user.id, {
        lastActive: new Date().toISOString()
      });

      // Remove password from returned user object
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as UserProfile;

    } catch (error) {
      console.error('Error validating user:', error);
      throw error;
    }
  }

  async addUser(user: Omit<UserProfile, 'id'>): Promise<string> {
    try {
      const id = await this.users.add({
        ...user,
        id: `user-${Date.now()}`,
      } as UserProfile);

      // Update cloud storage
      const allUsers = await this.users.toArray();
      storeUsers(allUsers);

      return id.toString();
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  async updateUser(id: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      await this.users.update(id, updates);
      
      // Update cloud storage
      const allUsers = await this.users.toArray();
      storeUsers(allUsers);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}

export const db = new AppDatabase();