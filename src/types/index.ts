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
  titleEn?: string;
  descriptionEn?: string;
  assignedTo?: string;
  assignedToEn?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  password: string;
}

export type UserRole = 'admin' | 'employee' | 'sales_manager';

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}