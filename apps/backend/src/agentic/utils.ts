import { db } from "../db";
import { ai_enhanced_experience, careerPaths, experiences } from "../db/schema";
import { eq, and } from "drizzle-orm";
import type {
    ExperienceDb,
    AiEnhancedExperienceDb,
    CareerPathsDb
} from '../db/schema';
import type { WriterRedefinedTopic } from "./enhance/state";
import type { resumeLanguage } from "@resume-builder/shared";

export async function getCareerPath(careerPathId: number): Promise<CareerPathsDb> {

    const result = db.query.careerPaths.findFirst({
        where: eq(careerPaths.id, careerPathId)
    })
    return result
}

export async function getExperience(experienceId: number): Promise<ExperienceDb> {

    const result = await db.query.experiences.findFirst({
        where: eq(experiences.id, experienceId)
    })
    return result
}

export async function getAiEnhancedExperience(experienceId: number): Promise<AiEnhancedExperienceDb> {

    const result = await db.query.ai_enhanced_experience.findFirst({
        where: eq(ai_enhanced_experience.experience_id, experienceId)
    })

    return result
}

export async function upsertAiEnhancedExperience(AiEnhancedExperience: WriterRedefinedTopic[], userId: number, expId: number, resumeLang: resumeLanguage) {

    const [inserted] = await db.insert(ai_enhanced_experience).values({
        user_id: userId,
        experience_id: expId,
        resume_lang: resumeLang,
        experience: AiEnhancedExperience,
    }).onConflictDoUpdate({
        target: [ai_enhanced_experience.user_id, ai_enhanced_experience.experience_id],

        set: {
            experience: AiEnhancedExperience,
            updatedAt: new Date()
        }
    }).returning();

    return {
        status: 201
    }
}