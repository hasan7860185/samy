import Dexie from 'dexie';
import { Client } from '../types';
import { Developer } from '../types/developer';
import { Project } from '../types/project';
import { Property } from '../types/property';
import { UserProfile, UserAction } from '../types/user';
import { Task } from '../types';

class AppDatabase extends Dexie {
  clients!: Dexie.Table<Client>;
  developers!: Dexie.Table<Developer>;
  projects!: Dexie.Table<Project>;
  properties!: Dexie.Table<Property>;
  users!: Dexie.Table<UserProfile>;
  userActions!: Dexie.Table<UserAction>;
  tasks!: Dexie.Table<Task>;

  constructor() {
    super('realEstateDB');
    
    this.version(1).stores({
      clients: '++id, status, facebookId, createdAt',
      developers: '++id, name, nameEn, createdAt',
      projects: '++id, developerId, status, createdAt',
      properties: '++id, status, type, createdAt',
      users: '++id, username, role, createdAt',
      userActions: '++id, userId, type, timestamp',
      tasks: '++id, status, priority, dueDate, createdAt',
    });
  }

  async initialize() {
    try {
      // Check if database exists
      const dbExists = await Dexie.exists('realEstateDB');
      
      if (!dbExists) {
        console.log('Initializing new database...');
        
        await this.open();
        
        // Create default admin user
        const defaultAdmin: UserProfile = {
          id: '1',
          username: 'admin',
          password: 'admin123', // In production, use hashed passwords
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
          },
          performance: {
            actions: 0,
            rating: 5,
            lastUpdated: new Date().toISOString(),
          },
        };

        await this.users.add(defaultAdmin);
        console.log('Database initialized with default admin user');
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }
}

export const db = new AppDatabase();

export async function initializeDatabase(): Promise<boolean> {
  try {
    return await db.initialize();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}