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

export interface SyncResult {
  success: boolean;
  error?: Error;
  data?: any;
}