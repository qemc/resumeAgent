import { ChatPromptTemplate } from "@langchain/core/prompts";
import type { ExperienceDb, AiEnhancedExperienceDb, CareerPathsDb } from '../db/schema';
import type { WriterRedefinedTopic } from "../types/agent";
import type { resumeLanguage } from "@resume-builder/shared";
export declare function getCareerPath(careerPathId: number): Promise<CareerPathsDb>;
export declare function getExperience(experienceId: number): Promise<ExperienceDb>;
export declare function getAiEnhancedExperience(experienceId: number): Promise<AiEnhancedExperienceDb | undefined>;
export declare function upsertAiEnhancedExperience(AiEnhancedExperience: WriterRedefinedTopic[], userId: number, expId: number, resumeLang: resumeLanguage): Promise<{
    status: number;
}>;
export declare function defaultPrompt(systemPrompt: string, userPrompt: string): ChatPromptTemplate<any, any>;
export declare function updateAiEnhanceLastUpdate(expId: number): Promise<void>;
//# sourceMappingURL=utils.d.ts.map