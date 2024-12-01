export const SYNC_CONFIG = {
  API_BASE: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/.netlify/functions`
    : '/.netlify/functions',
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY_MS: 2000,
    BACKOFF_FACTOR: 2,
  },
  TIMEOUT_MS: 30000,
  OFFLINE_STORAGE: {
    MAX_QUEUE_SIZE: 100,
    SYNC_INTERVAL_MS: 300000
  },
  CONNECTIVITY_CHECK: {
    TIMEOUT_MS: 5000,
    INTERVAL_MS: 60000
  }
};