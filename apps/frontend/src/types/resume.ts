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

export type LanguageCode = resumeLanguage;
export type ResumeLang = 'EN' | 'PL';

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

export interface CareerPath {
    id: number;
    user_id: number;
    resume_lang: ResumeLang;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

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
