import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(): string {
  return `${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
}

export function validateCredentials(username: string, password: string): void {
  if (!username || !password) {
    throw new Error('يرجى إدخال اسم المستخدم وكلمة المرور');
  }
  
  if (username.length < 3) {
    throw new Error('اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
  }
  
  if (password.length < 6) {
    throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }
}