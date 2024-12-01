export * from './user';
export * from './client';
export * from './property';
export * from './task';
export * from './developer';
export * from './project';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'employee' | 'sales_manager';
  password: string;
  fullName: string;
  phone?: string;
  department?: string;
  joinDate: string;
  lastActive: string;
  lastLogin?: string;
  createdAt: string;
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
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
  updatedAt: string;
}

export type TranslationKey =
  | 'light'
  | 'dark'
  | 'potential'
  | 'interested'
  | 'responded'
  | 'reserved'
  | 'cancelled'
  | 'sold'
  | 'postponed'
  | 'resale'
  | 'search'
  | 'add'
  | 'edit'
  | 'delete'
  | 'view'
  | 'save'
  | 'cancel'
  | 'clientStatuses'
  | 'showMore'
  | 'showLess'
  | 'new'
  | 'not_responded'
  | 'appointment_set'
  | 'post_meeting'
  | 'totalClients'
  | 'activeProperties'
  | 'tasks'
  | 'properties'
  | 'addProperty'
  | 'editProperty'
  | 'contactPhone'
  | 'contactEmail'
  | 'ar'
  | 'en';

export type Language = 'ar' | 'en';

export interface UserMetrics {
  total_actions: number;
  client_contact: number;
  client_meeting: number;
  property_showing: number;
  deal_closed: number;
  closedDeals: number;
  follow_up: number;
  document_processing: number;
}