/**
 * API Endpoints
 *
 * Single Source of Truth for all backend API calls.
 * The frontend acts as a "Black Box" - all API logic is centralized here.
 */

import { client } from './client';

// ============================================================================
// Types (mirrors backend schemas)
// ============================================================================

export interface HealthResponse {
    status: 'ok';
    message: string;
    timestamp: string;
}

export interface ResumeData {
    id: string;
    name: string;
    contact: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        linkedin?: string;
        github?: string;
    };
    experiences: Array<{
        id: string;
        company: string;
        position: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        description: string;
    }>;
    skills: Array<{
        id: string;
        name: string;
        level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    }>;
    certificates: Array<{
        id: string;
        name: string;
        issuer: string;
        date: string;
        url?: string;
    }>;
    projects: Array<{
        id: string;
        name: string;
        description: string;
        url?: string;
        technologies: string[];
    }>;
    createdAt: string;
    updatedAt: string;
}

export interface CreateResumeInput {
    name: string;
    contact: ResumeData['contact'];
    experiences?: ResumeData['experiences'];
    skills?: ResumeData['skills'];
    certificates?: ResumeData['certificates'];
    projects?: ResumeData['projects'];
}

export interface UpdateResumeInput extends Partial<CreateResumeInput> { }

// ============================================================================
// API Object - The "Remote Control"
// ============================================================================

export const api = {
    /**
     * Health & Status
     */
    health: {
        check: () => client.get<HealthResponse>('/'),
        detailed: () => client.get<HealthResponse>('/health'),
    },

    /**
     * Resume CRUD Operations
     * (To be implemented when backend endpoints are ready)
     */
    resume: {
        getAll: () => client.get<ResumeData[]>('/resumes'),
        getById: (id: string) => client.get<ResumeData>(`/resumes/${id}`),
        create: (data: CreateResumeInput) => client.post<ResumeData>('/resumes', data),
        update: (id: string, data: UpdateResumeInput) => client.patch<ResumeData>(`/resumes/${id}`, data),
        delete: (id: string) => client.delete<void>(`/resumes/${id}`),
    },

    /**
     * AI Features
     * (To be implemented when backend endpoints are ready)
     */
    ai: {
        generateBulletPoints: (description: string) =>
            client.post<{ bullets: string[] }>('/ai/bullet-points', { description }),
        analyzeJobOffer: (url: string) =>
            client.post<{ analysis: unknown }>('/ai/analyze-job', { url }),
    },
};

// Re-export client for edge cases
export { client, ApiError } from './client';
