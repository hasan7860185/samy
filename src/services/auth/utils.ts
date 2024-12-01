import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'default-secret', {
    expiresIn: '24h'
  });
};

export const validateCredentials = (username: string, password: string): void => {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};