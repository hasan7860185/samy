import { z } from 'zod';
import { ValidationError } from './errors';

const syncDataSchema = z.object({
  userId: z.string().min(1),
  data: z.object({
    users: z.array(z.any()).optional(),
    clients: z.array(z.any()).optional(),
    properties: z.array(z.any()).optional(),
    developers: z.array(z.any()).optional(),
    projects: z.array(z.any()).optional(),
    tasks: z.array(z.any()).optional(),
    lastSync: z.string().datetime()
  }),
  timestamp: z.string().datetime()
});

export function validateSyncData(data: unknown) {
  try {
    return syncDataSchema.parse(data);
  } catch (error) {
    throw new ValidationError('Invalid sync data format');
  }
}