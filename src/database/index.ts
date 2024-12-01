```typescript
import Dexie from 'dexie';
import { Client } from '../types';
import { Developer } from '../types/developer';
import { Project } from '../types/project';
import { Property } from '../types/property';
import { UserProfile, UserAction } from '../types/user';
import { Task } from '../types';

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
      // Check if database exists
      const dbExists = await Dexie.exists('realEstateDB');
      
      if (!dbExists) {
        console.log('Initializing new database...');
        
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
```