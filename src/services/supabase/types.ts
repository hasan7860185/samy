export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: SupabaseError | null;
}

export interface SupabasePaginatedResponse<T> extends SupabaseResponse<T[]> {
  count: number | null;
}