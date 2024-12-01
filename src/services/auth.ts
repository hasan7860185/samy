import { db } from './db';
import { UserProfile } from '../types/user';

export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';

export async function login(username: string, password: string): Promise<UserProfile> {
  try {
    const users = await db.users.toArray();
    const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password // In production, use proper password hashing
    );

    if (!user) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    // Update last login
    await db.users.update(user.id, {
      lastLogin: new Date().toISOString(),
      lastActive: new Date().toISOString()
    });

    // Store auth data
    localStorage.setItem(AUTH_TOKEN_KEY, generateToken());
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  window.location.href = '/login';
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getCurrentUser(): UserProfile | null {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}