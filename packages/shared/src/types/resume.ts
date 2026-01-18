/**
 * Resume Types
 * 
 * YOUR CONTROL: Define all resume-related data shapes here.
 * Both frontend and backend import from this single source of truth.
 */




// =============================================================================
// Contact Information
// =============================================================================

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

// =============================================================================
// Experience
// =============================================================================

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

// =============================================================================
// Skills
// =============================================================================

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
    id: string;
    name: string;
    level: SkillLevel;
    category?: string;
}

// =============================================================================
// Certificates
// =============================================================================

export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId?: string;
}

// =============================================================================
// Projects
// =============================================================================

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate?: string;
    endDate?: string;
}

// =============================================================================
// Interests
// =============================================================================

export interface Interest {
    id: string,
    name: string
}


// =============================================================================
// Languages
// =============================================================================


export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'Native';

export interface Language {
    id: string;
    level: LanguageLevel;
    name: string;
}

// =============================================================================
// Full Resume
// =============================================================================

export type resumeLanguage = 'EN' | 'PL';

export interface Resume {
    resumeLanguage: resumeLanguage;
    id: string;
    userId: string;
    name: string;
    contact: Contact;
    summary?: string;
    experiences: Experience[];
    skills: Skill[];
    certificates: Certificate[];
    projects: Project[];
    languages: Language[];
    interests: Interest[];
    createdAt: string;
    updatedAt: string;
}







