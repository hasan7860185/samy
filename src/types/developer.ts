import { Language } from '../contexts/LanguageContext';

export interface Developer {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  logo?: string;
  website?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}