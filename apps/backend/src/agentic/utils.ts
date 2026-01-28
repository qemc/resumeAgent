import { db } from "../db";
import { ai_enhanced_experience, careerPaths, experiences } from "../db/schema";
import { eq, and } from "drizzle-orm";
import type {
    ExperienceDb,
    AiEnhancedExperienceDb,
    careerPathsDb
} from '../db/schema';

export async function getCareerPath(careerPathId: number) {

    const result = db.query.careerPaths.findFirst({
        where: eq(careerPaths.id, careerPathId)
    })
    return result
}

export async function getExperience(experienceId: number) {

    const result = await db.query.experiences.findFirst({
        where: eq(experiences.id, experienceId)
    })
    return result
}

export async function getAiEnhancedExperience(experienceId: number) {

    const result = await db.query.experiences.findFirst({
        where: eq(ai_enhanced_experience.experience_id, experienceId)
    })

    return result
}