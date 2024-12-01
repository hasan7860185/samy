export type UserRole = 'admin' | 'employee' | 'sales_manager';
export type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

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
  createdAt?: string;
}

export interface UserAction {
  id: string;
  userId: string;
  type: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface UserPerformance {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly';
  metrics: {
    totalActions: number;
    clientContacts: number;
    meetings: number;
    showings: number;
    closedDeals: number;
    followUps: number;
    documents: number;
  };
  rating: number;
  startDate: string;
  endDate: string;
}