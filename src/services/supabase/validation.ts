import { z } from 'zod';
import { SUPABASE_CONFIG } from './config';

export const fileSchema = z.object({
  size: z.number().max(SUPABASE_CONFIG.STORAGE.MAX_FILE_SIZE),
  type: z.string().refine(
    type => {
      const allowedTypes = [
        ...SUPABASE_CONFIG.STORAGE.ALLOWED_IMAGE_TYPES,
        ...SUPABASE_CONFIG.STORAGE.ALLOWED_DOCUMENT_TYPES
      ];
      return allowedTypes.includes(type);
    },
    { message: 'Invalid file type' }
  )
});

export function validateFile(file: File) {
  return fileSchema.parse(file);
}

export const clientSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  status: z.string(),
  notes: z.string().optional()
});

export const propertySchema = z.object({
  title: z.string().min(2),
  description: z.string(),
  price: z.number().positive(),
  location: z.object({
    city: z.string(),
    district: z.string(),
    address: z.string()
  })
});

export function validateClient(data: unknown) {
  return clientSchema.parse(data);
}

export function validateProperty(data: unknown) {
  return propertySchema.parse(data);
}