import { UserProfile } from '../../types/user';
import { StorageError } from './errors';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';
const USERS_KEY = 'users_data';

export function storeAuthData(user: UserProfile, token: string): void {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    
    // Update users list
    const users = getStoredUsers();
    const updatedUsers = users.filter(u => u.id !== user.id);
    updatedUsers.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  } catch (error) {
    console.error('Error storing auth data:', error);
    throw new StorageError('Failed to store authentication data');
  }
}

export function clearAuthData(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
}

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting stored token:', error);
    return null;
  }
}

export function getStoredUser(): UserProfile | null {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
}

export function getStoredUsers(): UserProfile[] {
  try {
    const usersData = localStorage.getItem(USERS_KEY);
    return usersData ? JSON.parse(usersData) : [];
  } catch (error) {
    console.error('Error getting stored users:', error);
    return [];
  }
}

export function storeUsers(users: UserProfile[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error storing users:', error);
    throw new StorageError('Failed to store users data');
  }
}

export function generateToken(): string {
  return `${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
}