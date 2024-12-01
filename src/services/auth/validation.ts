import { UserProfile } from '../../types/user';
import { AuthError } from './errors';

export function validateUser(user: UserProfile): void {
  if (!user.username || user.username.length < 3) {
    throw new AuthError('Username must be at least 3 characters long');
  }

  if (!user.email || !isValidEmail(user.email)) {
    throw new AuthError('Invalid email address');
  }

  if (!user.fullName || user.fullName.length < 2) {
    throw new AuthError('Full name is required');
  }

  if (!user.role || !['admin', 'employee', 'sales_manager'].includes(user.role)) {
    throw new AuthError('Invalid user role');
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}