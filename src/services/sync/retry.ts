import { SYNC_CONFIG } from './config';
import { NetworkError } from './errors';

interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: SYNC_CONFIG.RETRY.MAX_ATTEMPTS,
  delayMs: SYNC_CONFIG.RETRY.INITIAL_DELAY_MS,
  backoffFactor: SYNC_CONFIG.RETRY.BACKOFF_FACTOR
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxAttempts, delayMs, backoffFactor } = { ...defaultOptions, ...options };
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (!(error instanceof NetworkError) || attempt === maxAttempts) {
        throw lastError;
      }

      const delay = delayMs * Math.pow(backoffFactor, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}