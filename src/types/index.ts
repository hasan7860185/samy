export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  facebookId?: string;
  status: ClientStatus;
  notes?: string;
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

export type UserRole = 'admin' | 'employee' | 'sales_manager';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  description: string;
  images: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}