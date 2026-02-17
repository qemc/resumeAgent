export interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    website?: string;
    location?: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    highlights?: string[];
}

export type ExperienceInput = Omit<Experience, 'id'>;

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
    id: string;
    name: string;
    level: SkillLevel;
    category?: string;
}

export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
}

export type CertificateInput = Omit<Certificate, 'id'>;

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate?: string;
    endDate?: string;
    url?: string;
}

export type ProjectInput = Omit<Project, 'id'>;

export interface Interest {
    id: string;
    name: string;
}

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'Native';

export interface Language {
    id: string;
    level: LanguageLevel;
    name: string;
}

export type resumeLanguage = 'EN' | 'PL';
