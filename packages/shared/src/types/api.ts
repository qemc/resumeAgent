/**
 * API Types
 * 
 * YOUR CONTROL: Define common API response shapes here.
 * Used for consistent error handling across frontend and backend.
 */

// =============================================================================
// Generic API Response Wrapper
// =============================================================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// =============================================================================
// Pagination
// =============================================================================

export interface PaginatedRequest {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}