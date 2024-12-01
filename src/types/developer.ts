import { Language } from './user';

export interface Developer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  logo?: string;
  language?: Language;
}