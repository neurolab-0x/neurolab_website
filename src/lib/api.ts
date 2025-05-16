import { logger } from './logger';

const API_TIMEOUT = 10000; // 10 seconds
const API_BASE_URL = 'https://web-backend-ivhv.onrender.com/api';

interface ApiOptions extends RequestInit {
  timeout?: number;
}

async function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
  });
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { timeout: timeoutMs = API_TIMEOUT, ...fetchOptions } = options;
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await Promise.race([
      fetch(url, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      }),
      timeout(timeoutMs),
    ]);

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      logger.error('API request failed', {
        url,
        status: response.status,
        statusText: response.statusText,
      });
      throw error;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    logger.error('API request error', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

// Helper methods for common HTTP methods
export const apiClient = {
  get: <T>(endpoint: string, options?: ApiOptions) =>
    api<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data: unknown, options?: ApiOptions) =>
    api<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown, options?: ApiOptions) =>
    api<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: ApiOptions) =>
    api<T>(endpoint, { ...options, method: 'DELETE' }),
}; 