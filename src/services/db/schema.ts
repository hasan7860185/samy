import { UserProfile, Client, Developer, Project, Property, Task } from '../../types';

export interface DBSchema {
  users: UserProfile[];
  clients: Client[];
  developers: Developer[];
  projects: Project[];
  properties: Property[];
  tasks: Task[];
}

export const defaultData: Partial<DBSchema> = {
  users: [{
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
    createdAt: new Date().toISOString(),
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
  }]
};