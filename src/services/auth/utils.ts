import jwt from 'jsonwebtoken';
import { UserProfile } from '../../types/user';

export const generateToken = (user: UserProfile): string => {
  const secret = process.env.JWT_SECRET || 'default-secret-key';
  return jwt.sign(
    { 
      id: user.id,
      username: user.username,
      role: user.role 
    },
    secret,
    { expiresIn: '24h' }
  );
};

export { generateToken as generateAuthToken };