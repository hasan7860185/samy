export class SupabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string
  ) {
    super(message);
    this.name = 'SupabaseError';
  }
}

export class AuthError extends SupabaseError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = 'AuthError';
  }
}

export class StorageError extends SupabaseError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = 'StorageError';
  }
}

export class DatabaseError extends SupabaseError {
  constructor(message: string, code?: string, details?: string) {
    super(message, code, details);
    this.name = 'DatabaseError';
  }
}