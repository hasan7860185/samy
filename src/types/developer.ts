import { Language } from './index';

export interface Developer {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  logo?: string;
  language?: Language;
}