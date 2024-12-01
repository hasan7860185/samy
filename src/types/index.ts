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
  lastLogin?: string;
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
  updatedAt: string;
}

export type UserRole = 'admin' | 'employee' | 'sales_manager';
export type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

export interface Task {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Property {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  area: number;
  location: {
    city: string;
    cityEn: string;
    district: string;
    districtEn: string;
    address: string;
    addressEn: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: PropertyFeatures;
  media: {
    images: string[];
    videos: string[];
    virtualTour?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFeatures {
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  yearBuilt?: number;
  hasPool?: boolean;
  hasGarden?: boolean;
  hasElevator?: boolean;
  isFurnished?: boolean;
}

export type PropertyType = 
  | 'apartment'
  | 'villa'
  | 'land'
  | 'commercial'
  | 'office'
  | 'warehouse';

export type PropertyStatus =
  | 'available'
  | 'sold'
  | 'rented'
  | 'under_contract'
  | 'maintenance';