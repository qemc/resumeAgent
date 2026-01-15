/**
 * Services Exports
 * 
 * Central export for all service modules.
 * Import like: import { api, aiService, dbService } from '@/services';
 */

export { api, type ApiResponse, type SubmitResumeResponse, type GeneratedResume } from './api';
export {
    aiService,
    type GeneratedBulletPoints,
    type JobOfferAnalysis,
    type TailoredResume
} from './ai';
export {
    dbService,
    type SavedResume,
    type ResumeWithData
} from './db';
