export type UserRole = 'admin' | 'employee' | 'sales_manager';
export type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

export interface UserAction {
  id: string;
  userId: string;
  type: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  department?: string;
  joinDate: string;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
  theme: Theme;
  language: Language;
  notifications: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
  };
  avatar?: string;
  performance?: {
    actions: number;
    rating: number;
    lastUpdated: string;
  };
}