/**
 * Application constants.
 * Centralized configuration for easy maintenance.
 */

// Re-export SkillLevel from shared for consistency
export type { SkillLevel } from '@resume-builder/shared';

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
