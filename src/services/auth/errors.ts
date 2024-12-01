export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class InitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InitializationError';
  }
}