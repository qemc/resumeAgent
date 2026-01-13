/**
 * Resume data types.
 * These types define the shape of all resume-related data.
 */

import type { SkillLevel } from '../lib/constants';

/**
 * Contact information for the resume.
 */
export interface ContactData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
}

/**
 * Work experience entry.
 * Note: `description` is a free-form text field where users can write
 * detailed information. AI agents will later process this into bullet points.
 */
export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: string; // Free-form text, AI will convert to bullets later
}

/**
 * Skill entry with optional proficiency level.
 */
export interface Skill {
    id: string;
    name: string;
    level: SkillLevel;
}

/**
 * Certificate or certification entry.
 */
export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
}

/**
 * Project entry for portfolio section.
 */
export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string;
    url?: string;
}

/**
 * Complete resume form data structure.
 * This is the main data model used throughout the application.
 */
export interface ResumeFormData {
    contact: ContactData;
    experiences: Experience[];
    skills: Skill[];
    certificates: Certificate[];
    projects: Project[];
}

/**
 * Factory functions to create empty data objects.
 * Used when adding new entries to dynamic lists.
 */
export const createEmptyContact = (): ContactData => ({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
});

export const createEmptyExperience = (id: string): Experience => ({
    id,
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
});

export const createEmptySkill = (id: string): Skill => ({
    id,
    name: '',
    level: 'Intermediate',
});

export const createEmptyCertificate = (id: string): Certificate => ({
    id,
    name: '',
    issuer: '',
    date: '',
    url: '',
});

export const createEmptyProject = (id: string): Project => ({
    id,
    name: '',
    description: '',
    technologies: '',
    url: '',
});
