/**
 * API Client
 *
 * Generic fetch wrapper for type-safe API calls.
 * Handles base URL, JSON parsing, and error handling.
 */

// API base URL from environment (Vite exposes env vars with VITE_ prefix)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * API Error class for structured error handling
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public data?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Request options extending standard fetch options
 */
interface RequestOptions extends Omit<RequestInit, 'body'> {
    body?: unknown;
}

/**
 * Generic fetch wrapper with type safety
 */
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { body, headers: customHeaders, ...rest } = options;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...customHeaders,
    };

    const config: RequestInit = {
        ...rest,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Parse JSON response (or empty object for 204)
    const data = response.status === 204 ? null : await response.json();

    if (!response.ok) {
        throw new ApiError(
            data?.message || `Request failed with status ${response.status}`,
            response.status,
            data
        );
    }

    return data as T;
}

/**
 * HTTP method helpers
 */
export const client = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'POST', body }),

    put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PUT', body }),

    patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PATCH', body }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),
};
