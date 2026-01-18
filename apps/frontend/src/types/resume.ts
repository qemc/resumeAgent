/**
 * Frontend Types
 * 
 * Re-exports shared types and adds UI-specific factory functions.
 * Components import from: '@/types' or '@resume-builder/shared'
 */

// Re-export all shared types (so components can import from '@/types')
export type {
    Contact,
    Experience,
    Skill,
    SkillLevel,
    Certificate,
    Project,
    Resume,
    Interest,
    Language,
    LanguageLevel,
    ApiResponse,
} from '@resume-builder/shared';

// Import types for local use in factory functions
import type { Contact, Experience, Skill, Certificate, Project, Interest, Language } from '@resume-builder/shared';

export type { resumeLanguage as LanguageCode } from '@resume-builder/shared';

// ===========================================================================
// UI-Specific Type (form data structure)
// ===========================================================================

export interface ResumeFormData {
    contact: Contact;
    experiences: Experience[];
    skills: Skill[];
    certificates: Certificate[];
    projects: Project[];
    interests: Interest[];
    languages: Language[];
}

// ===========================================================================
// Factory Functions (create empty form entries)
// ===========================================================================

export const createEmptyContact = (): Contact => ({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    website: '',
    location: '',
});

export const createEmptyExperience = (id: string): Experience => ({
    id,
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    highlights: [],
});

export const createEmptySkill = (id: string): Skill => ({
    id,
    name: '',
    level: 'intermediate',
});

export const createEmptyCertificate = (id: string): Certificate => ({
    id,
    name: '',
    issuer: '',
    date: '',
});

export const createEmptyProject = (id: string): Project => ({
    id,
    name: '',
    description: '',
    technologies: [],
});

export const createEmptyInterest = (id: string): Interest => ({
    id,
    name: '',
});

export const createEmptyLanguage = (id: string): Language => ({
    id,
    name: '',
    level: 'Native',
});
