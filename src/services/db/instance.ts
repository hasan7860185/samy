import Dexie from 'dexie';
import { Client, UserProfile, UserAction, Task, Property } from '../../types';
import { Developer } from '../../types/developer';
import { Project } from '../../types/project';

class AppDatabase extends Dexie {
  clients!: Dexie.Table<Client, string>;
  developers!: Dexie.Table<Developer, string>;
  projects!: Dexie.Table<Project, string>;
  properties!: Dexie.Table<Property, string>;
  users!: Dexie.Table<UserProfile, string>;
  userActions!: Dexie.Table<UserAction, string>;
  tasks!: Dexie.Table<Task, string>;

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
      const dbExists = await Dexie.exists('realEstateDB');
      
      if (!dbExists) {
        console.log('Initializing new database...');
        
        const defaultAdmin: UserProfile = {
          id: '1',
          username: 'admin',
          password: 'admin123',
          email: 'admin@example.com',
          fullName: 'مدير النظام',
          role: 'admin',
          phone: '0501234567',
          department: 'الإدارة',
          joinDate: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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

  async validateUser(username: string, password: string) {
    const user = await this.users.where('username').equals(username).first();
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}

export const db = new AppDatabase();