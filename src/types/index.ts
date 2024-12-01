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
  titleEn: string;
  description: string;
  descriptionEn: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  assignedToEn: string;
  createdAt: string;
  updatedAt: string;
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
  updatedAt: string;
}

export type UserRole = 'admin' | 'employee' | 'sales_manager';
export type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

export type User = UserProfile;

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
  features: {
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    yearBuilt?: number;
    hasPool?: boolean;
    hasGarden?: boolean;
    hasElevator?: boolean;
    isFurnished?: boolean;
  };
  media: {
    images: string[];
    videos: string[];
    virtualTour?: string;
  };
  createdAt: string;
  updatedAt: string;
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

export interface Project {
  id: string;
  developerId: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  location: {
    city: string;
    cityEn: string;
    district: string;
    districtEn: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  type: ProjectType;
  status: ProjectStatus;
  startDate: string;
  completionDate: string;
  totalUnits: number;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  features: string[];
  featuresEn: string[];
  media: {
    images: string[];
    videos: string[];
    brochure?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type ProjectType = 
  | 'residential'
  | 'commercial'
  | 'mixed_use'
  | 'industrial';

export type ProjectStatus = 
  | 'planned'
  | 'under_construction'
  | 'completed'
  | 'sold_out';