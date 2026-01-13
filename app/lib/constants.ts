/**
 * Application constants.
 * Centralized configuration for easy maintenance.
 */

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
export type SkillLevel = (typeof SKILL_LEVELS)[number];

export const APP_CONFIG = {
    name: 'Resume Builder',
    description: 'Create personalized CVs tailored to job offers',
} as const;

export const FORM_VALIDATION = {
    maxDescriptionLength: 5000,
    maxSkillNameLength: 100,
    maxProjectDescriptionLength: 2000,
} as const;
