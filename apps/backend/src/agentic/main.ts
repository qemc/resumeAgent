import 'dotenv/config';
import { db } from "../db";
import { careerPaths, experiences } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { testPrompt } from "./prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({ model: 'gpt-5-nano' })

async function getCareerPath(careerPathId: number, userId: number) {
    return await db.query.careerPaths.findFirst({
        where: and(eq(careerPaths.id, careerPathId), eq(careerPaths.user_id, userId))
    })
}

async function getExperiences(lang: string, userId: number) {
    return await db.query.experiences.findMany({
        where: and(eq(experiences.user_id, userId), eq(experiences.resume_lang, lang))
    })
}

const testChain = testPrompt.pipe(model).pipe(new StringOutputParser())
const result = testChain.invoke(
    { book: "Harry Potter and Order of the Phoenix" }
)

console.log(await result)

// To do:
// Add types for db interactions