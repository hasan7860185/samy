import { db } from '../db';
import { UserProfile } from '../../types';
import { AuthResponse, AuthError } from './types';
import { generateToken } from './utils';

export async function login(username: string, password: string): Promise<AuthResponse> {
  try {
    if (!username || !password) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    const users = await db.users.toArray();
    const user = users.find(u => u.username === username);

    if (!user) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    // In production, use proper password hashing comparison
    if (password !== user.password) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    const token = generateToken(user.id);
    return { user, token };
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : 'حدث خطأ أثناء تسجيل الدخول',
      status: 401
    } as AuthError;
  }
}

export async function refreshUserData(userId: string): Promise<UserProfile> {
  try {
    const user = await db.users.get(userId);
    if (!user) {
      throw new Error('المستخدم غير موجود');
    }
    return user;
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : 'حدث خطأ أثناء تحديث بيانات المستخدم',
      status: 404
    } as AuthError;
  }
}