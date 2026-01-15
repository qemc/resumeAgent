/**
 * API Service (Legacy Wrapper)
 *
 * This module provides backward compatibility with existing code.
 * All new code should import directly from '@/api' instead.
 *
 * @deprecated Use '@/api' directly for new code
 */

import { client, ApiError } from '@/api';
import type { ResumeFormData } from '@/types';

/**
 * API response types (legacy format)
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface SubmitResumeResponse {
    id: string;
    message: string;
}

export interface GeneratedResume {
    id: string;
    pdfUrl: string;
    createdAt: string;
}

/**
 * API client with methods for backend communication.
 * Currently stubs - will be connected when backend endpoints are ready.
 */
export const api = {
    /**
     * Submit resume data to the backend.
     */
    submitResume: async (data: ResumeFormData): Promise<ApiResponse<SubmitResumeResponse>> => {
        try {
            // TODO: Connect to actual backend endpoint when ready
            console.log('[API] submitResume called with:', data.contact.firstName);

            // Stub implementation for now
            return {
                success: true,
                data: {
                    id: 'stub-id-' + Date.now(),
                    message: 'Resume submitted successfully',
                },
            };
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Unknown error';
            return {
                success: false,
                error: message,
            };
        }
    },

    /**
     * Check backend health
     */
    healthCheck: async (): Promise<ApiResponse<{ status: string; message: string }>> => {
        try {
            const result = await client.get<{ status: string; message: string; timestamp: string }>('/');
            return {
                success: true,
                data: {
                    status: result.status,
                    message: result.message,
                },
            };
        } catch (err) {
            const message = err instanceof ApiError ? err.message : 'Unknown error';
            return {
                success: false,
                error: message,
            };
        }
    },

    /**
     * Retrieve a saved resume by ID.
     * (Placeholder - to be implemented)
     */
    getResume: async (_id: string): Promise<ApiResponse<ResumeFormData>> => {
        return {
            success: false,
            error: 'Resume retrieval not implemented yet',
        };
    },

    /**
     * Generate PDF from resume data.
     * (Placeholder - to be implemented)
     */
    generatePdf: async (_id: string): Promise<ApiResponse<GeneratedResume>> => {
        return {
            success: false,
            error: 'PDF generation not implemented yet',
        };
    },
};
