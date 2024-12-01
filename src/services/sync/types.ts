export interface SyncData {
  userId: string;
  data: any;
  timestamp: string;
}

export interface SyncResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: {
    code: string;
    message: string;
  };
}

export interface SyncResult<T = any> {
  success: boolean;
  data?: T;
  error?: Error;
}

export interface SyncOptions {
  force?: boolean;
  retry?: boolean;
  timeout?: number;
}

export interface SyncProgress {
  total: number;
  current: number;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  message?: string;
}