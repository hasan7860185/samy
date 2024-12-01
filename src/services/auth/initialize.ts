import { db } from '../db/instance';
import { hashPassword } from './utils';
import { UserProfile } from '../../types/user';
import { InitializationError } from './errors';
import { validateUser } from './validation';

export async function initializeAuth(): Promise<boolean> {
  try {
    const userCount = await db.users.count();
    
    if (userCount === 0) {
      const hashedPassword = await hashPassword('admin');
      const defaultAdmin: UserProfile = {
        id: '1',
        username: 'admin',
        password: hashedPassword,
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
        }
      };

      await db.users.add(defaultAdmin);
      return true;
    }

    return true;
  } catch (error) {
    throw new InitializationError(
      error instanceof Error ? error.message : 'Failed to initialize authentication'
    );
  }
}