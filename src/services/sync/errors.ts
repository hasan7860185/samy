export class SyncError extends Error {
  constructor(message: string, public cause?: Error) {
    super(message);
    this.name = 'SyncError';
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SyncError);
    }

    // Set the prototype explicitly for better instanceof support
    Object.setPrototypeOf(this, SyncError.prototype);
  }
}

export class NetworkError extends SyncError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class ValidationError extends SyncError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}