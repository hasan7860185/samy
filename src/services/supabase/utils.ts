import { SUPABASE_CONFIG } from './config';
import { StorageError } from './errors';

export function generateStoragePath(bucket: string, fileName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = fileName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
}

export function validateStorageBucket(bucket: string): void {
  const validBuckets = Object.values(SUPABASE_CONFIG.STORAGE.BUCKETS);
  if (!validBuckets.includes(bucket)) {
    throw new StorageError(`Invalid storage bucket: ${bucket}`);
  }
}

export function formatStorageUrl(bucket: string, path: string): string {
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

export function getFileType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  return mimeTypes[extension || ''] || 'application/octet-stream';
}