import { SYNC_CONFIG } from './config';
import { NetworkError, ValidationError } from './errors';
import { validateSyncData } from './validation';
import type { SyncData, SyncResponse } from './types';

async function checkConnectivity(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SYNC_CONFIG.CONNECTIVITY_CHECK.TIMEOUT_MS);

    const response = await fetch(`${SYNC_CONFIG.API_BASE}/health`, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store'
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number = SYNC_CONFIG.TIMEOUT_MS
): Promise<Response> {
  const isOnline = await checkConnectivity();
  if (!isOnline) {
    throw new NetworkError('No internet connection available');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new NetworkError(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (error instanceof NetworkError) {
      throw error;
    }
    if (error.name === 'AbortError') {
      throw new NetworkError('Request timed out');
    }
    throw new NetworkError('Network request failed');
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function uploadData(data: SyncData): Promise<SyncResponse> {
  try {
    validateSyncData(data);

    const response = await fetchWithTimeout(
      `${SYNC_CONFIG.API_BASE}/store-data`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();
    if (!result.success) {
      throw new NetworkError(result.message || 'Upload failed');
    }

    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    if (error instanceof NetworkError) {
      throw error;
    }
    throw new NetworkError('Failed to upload data');
  }
}

export async function fetchData(userId: string): Promise<SyncResponse> {
  try {
    const response = await fetchWithTimeout(
      `${SYNC_CONFIG.API_BASE}/get-data?userId=${encodeURIComponent(userId)}`,
      { method: 'GET' }
    );

    const result = await response.json();
    if (!result.success) {
      throw new NetworkError(result.message || 'Fetch failed');
    }

    return result;
  } catch (error) {
    if (error instanceof NetworkError) {
      throw error;
    }
    throw new NetworkError('Failed to fetch data');
  }
}