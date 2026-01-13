/**
 * API Service
 * 
 * Central API client for backend communication.
 * Currently contains stubs that will be implemented when backend is ready.
 * 
 * Usage:
 * import { api } from '@/app/services/api';
 * await api.submitResume(formData);
 */

import type { ResumeFormData } from '@/app/types';

/**
 * API response types.
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
 */
export const api = {
    /**
     * Submit resume data to the backend.
     * 
     * @param data - Complete resume form data
     * @returns Promise with submission result
     * 
     * TODO: Implement actual API call
     */
    submitResume: async (data: ResumeFormData): Promise<ApiResponse<SubmitResumeResponse>> => {
        // Stub implementation - replace with actual API call
        console.log('[API] submitResume called with:', data);

        return {
            success: true,
            data: {
                id: 'stub-id-' + Date.now(),
                message: 'Resume submitted successfully',
            },
        };
    },

    /**
     * Retrieve a saved resume by ID.
     * 
     * @param id - Resume ID
     * @returns Promise with resume data
     * 
     * TODO: Implement actual API call
     */
    getResume: async (id: string): Promise<ApiResponse<ResumeFormData>> => {
        console.log('[API] getResume called with id:', id);

        return {
            success: false,
            error: 'Not implemented yet',
        };
    },

    /**
     * Generate PDF from resume data.
     * 
     * @param id - Resume ID
     * @returns Promise with generated PDF URL
     * 
     * TODO: Implement actual API call
     */
    generatePdf: async (id: string): Promise<ApiResponse<GeneratedResume>> => {
        console.log('[API] generatePdf called with id:', id);

        return {
            success: false,
            error: 'Not implemented yet',
        };
    },
};
