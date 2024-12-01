export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  facebookId?: string;
  status: ClientStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ClientStatus =
  | 'new'
  | 'potential'
  | 'interested'
  | 'responded'
  | 'not_responded'
  | 'appointment_set'
  | 'post_meeting'
  | 'reserved'
  | 'cancelled'
  | 'sold'
  | 'postponed'
  | 'resale';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  titleEn: string;
  descriptionEn: string;
  assignedTo: string;
  assignedToEn: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  lastLogin?: string;
}

export type UserRole = 'admin' | 'employee' | 'sales_manager';
export type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  price: number;
  location: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  media: {
    images: string[];
    videos: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  developerId: string;
  status: string;
  location: string;
  startDate: string;
  endDate: string;
  budget: number;
  media: {
    images: string[];
    videos: string[];
  };
  createdAt: string;
  updatedAt: string;
}