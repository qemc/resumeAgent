import type { Contact, ResumeData } from '@/types';


export type { SkillLevel } from '@/types';

export const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'] as const;

export const APP_CONFIG = {
    name: 'Resume Builder',
    description: 'Create personalized CVs tailored to job offers',
} as const;

export const FORM_VALIDATION = {
    maxDescriptionLength: 5000,
    maxSkillNameLength: 100,
    maxProjectDescriptionLength: 2000,
} as const;


export const emptyContact: Contact = {
    firstName: '', lastName: '', email: '', phone: '',
    linkedin: '', github: '', website: '', location: ''
};

export const emptyResumeData: ResumeData = {
    resumeId: null,
    contact: emptyContact,
    summary: '',
    skills: [],
    languages: [],
    interests: [],
    experienceRows: [],
    certificateRows: [],
    projectRows: [],
};
