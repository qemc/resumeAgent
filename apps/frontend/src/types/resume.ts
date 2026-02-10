/**
 * Frontend Types
 * 
 * Centralized type definitions for the frontend application.
 */

import type {
    Contact,
    Skill,
    Language,
    Interest,
    ExperienceInput,
    CertificateInput,
    ProjectInput,
} from '@resume-builder/shared';

// Re-export shared types
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
    ExperienceInput,
    CertificateInput,
    ProjectInput,
} from '@resume-builder/shared';

export type { resumeLanguage as LanguageCode } from '@resume-builder/shared';

// App-specific types
export type ResumeLang = 'EN' | 'PL';

// API Response Types
export interface ResumeResponse {
    id: number;
    user_id: number;
    resume_lang: ResumeLang;
    contact: Contact;
    summary?: string;
    skills: Skill[];
    languages: Language[];
    interests: Interest[];
}

export interface ExperienceRow {
    id: number;
    user_id: number;
    resume_lang: ResumeLang;
    experience: ExperienceInput;
}

export interface CertificateRow {
    id: number;
    user_id: number;
    resume_lang: ResumeLang;
    certificate: CertificateInput;
}

export interface ProjectRow {
    id: number;
    user_id: number;
    resume_lang: ResumeLang;
    project: ProjectInput;
}

// State Management Types
export interface ResumeData {
    resumeId: number | null;
    contact: Contact;
    summary: string;
    skills: Skill[];
    languages: Language[];
    interests: Interest[];
    experienceRows: ExperienceRow[];
    certificateRows: CertificateRow[];
    projectRows: ProjectRow[];
}

// Career Path Types
export interface CareerPath {
    id: number;
    user_id: number;
    resume_lang: ResumeLang;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

// Topic Types
export interface TopicText {
    topic: string;
    preTopic: {
        redefinedTopic: string;
        refinedQuotes: string[];
    };
}

export interface TopicRow {
    id: number;
    career_path_id: number;
    user_id: number;
    experience_id: number;
    resume_lang: ResumeLang;
    topic_text: TopicText;
    createdAt: string;
}

