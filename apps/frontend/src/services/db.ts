/**
 * Database Service
 * 
 * SQLite integration point for local data persistence.
 * Currently contains stubs that will be implemented with better-sqlite3 or similar.
 * 
 * Usage:
 * import { dbService } from '@/services/db';
 * await dbService.saveResume(formData);
 */

import type { ResumeFormData } from '@/types';

/**
 * Saved resume metadata.
 */
export interface SavedResume {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Resume with full data.
 */
export interface ResumeWithData extends SavedResume {
    data: ResumeFormData;
}

/**
 * Database service for local persistence.
 * 
 * This will be implemented using SQLite (e.g., better-sqlite3)
 * for fast local storage without requiring a separate database server.
 */
export const dbService = {
    /**
     * Initialize the database (create tables if not exist).
     * 
     * TODO: Implement SQLite initialization
     */
    initialize: async (): Promise<void> => {
        console.log('[DB] initialize called');
        // Create tables: resumes, experiences, skills, certificates, projects
    },

    /**
     * Save a resume to the local database.
     * 
     * @param data - Complete resume form data
     * @param name - Optional name for the resume
     * @returns Promise with saved resume metadata
     * 
     * TODO: Implement SQLite insert/update
     */
    saveResume: async (data: ResumeFormData, name?: string): Promise<SavedResume> => {
        console.log('[DB] saveResume called with:', { name, contactName: data.contact.firstName });

        const id = 'local-' + Date.now();
        const now = new Date().toISOString();

        return {
            id,
            name: name || `${data.contact.firstName} ${data.contact.lastName}'s Resume`,
            createdAt: now,
            updatedAt: now,
        };
    },

    /**
     * Load a resume from the local database.
     * 
     * @param id - Resume ID
     * @returns Promise with resume data or null if not found
     * 
     * TODO: Implement SQLite select
     */
    loadResume: async (id: string): Promise<ResumeWithData | null> => {
        console.log('[DB] loadResume called with id:', id);

        return null;
    },

    /**
     * List all saved resumes.
     * 
     * @returns Promise with array of saved resume metadata
     * 
     * TODO: Implement SQLite select all
     */
    listResumes: async (): Promise<SavedResume[]> => {
        console.log('[DB] listResumes called');

        return [];
    },

    /**
     * Delete a saved resume.
     * 
     * @param id - Resume ID
     * @returns Promise<boolean> indicating success
     * 
     * TODO: Implement SQLite delete
     */
    deleteResume: async (id: string): Promise<boolean> => {
        console.log('[DB] deleteResume called with id:', id);

        return false;
    },

    /**
     * Update an existing resume.
     * 
     * @param id - Resume ID
     * @param data - Updated resume data
     * @returns Promise with updated metadata
     * 
     * TODO: Implement SQLite update
     */
    updateResume: async (id: string, _data: ResumeFormData): Promise<SavedResume | null> => {
        console.log('[DB] updateResume called with id:', id);

        return null;
    },
};
