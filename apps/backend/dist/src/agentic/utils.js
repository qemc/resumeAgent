import { db } from "../db";
import { ai_enhanced_experience, careerPaths, experiences } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { ChatPromptTemplate } from "@langchain/core/prompts";
export async function getCareerPath(careerPathId) {
    const result = await db.query.careerPaths.findFirst({
        where: eq(careerPaths.id, careerPathId)
    });
    return result;
}
export async function getExperience(experienceId) {
    const result = await db.query.experiences.findFirst({
        where: eq(experiences.id, experienceId)
    });
    return result;
}
export async function getAiEnhancedExperience(experienceId) {
    const result = await db.query.ai_enhanced_experience.findFirst({
        where: eq(ai_enhanced_experience.experience_id, experienceId)
    });
    return result;
}
export async function upsertAiEnhancedExperience(AiEnhancedExperience, userId, expId, resumeLang) {
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
    };
}
export function defaultPrompt(systemPrompt, userPrompt) {
    return ChatPromptTemplate.fromMessages([
        ["system", systemPrompt],
        ["human", userPrompt]
    ]);
}
export async function updateAiEnhanceLastUpdate(expId) {
    await db.update(ai_enhanced_experience)
        .set({ updatedAt: new Date() })
        .where(eq(ai_enhanced_experience.experience_id, expId));
}
//# sourceMappingURL=utils.js.map