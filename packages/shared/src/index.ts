/**
 * Shared Types Package
 * 
 * Single source of truth for all TypeScript interfaces.
 * Import in frontend: import { Resume } from '@resume-builder/shared';
 * Import in backend:  import { Resume } from '@resume-builder/shared';
 */

// Resume Data
export type {
    Contact,
    Experience,
    ExperienceInput,
    Skill,
    SkillLevel,
    Certificate,
    CertificateInput,
    Project,
    ProjectInput,
    Interest,
    Language,
    LanguageLevel,
    Resume,
    resumeLanguage,
} from './types/resume';

// API Utilities
export type {
    ApiResponse,
    PaginatedRequest,
    PaginatedResponse,
} from './types/api';
