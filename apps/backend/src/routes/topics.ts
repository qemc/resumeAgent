import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { careerPaths, topics, users } from "../db/schema";
import { AppError, ERRORS } from "../../utils/errors";
import type { CareerPath, Topic } from "../types/agent";
import { topicsAgent } from "../agentic/topics/topics";
import type { TopicDbInsert } from "../db/schema";
import { generateSingleTopic } from "../agentic/topics/singleTopic";
import { trackGenerateAll, untrackGenerateAll, trackRegenerate, untrackRegenerate, getActiveGenerations } from "../generationTracker";



const loadAllTopicsParamSchema = z.object({
    careerPath: z.coerce.number().int().positive(),
    lang: z.enum(['EN', 'PL'])
});

const expTopicSchema = z.object({
    careerPath: z.coerce.number().int().positive(),
    lang: z.enum(['EN', 'PL']),
    experience: z.coerce.number().int().positive(),
})

const expSingleTopicSchema = z.object({
    id: z.coerce.number().int().positive(),
    topic: z.string(),
    userHint: z.string()
})

const topicSchema = z.object({
    topic: z.string(),
})
const updateTopicSchema = z.object({
    topic: z.string(),
    id: z.coerce.number().int().positive(),
})


export async function topicRoutes(app: FastifyInstance) {

    // get all topics related to single career path (on page load)
    app.get('/topics/:careerPath/:lang', { onRequest: [app.auth] }, async (req) => {

        const { careerPath, lang } = loadAllTopicsParamSchema.parse(req.params)

        const items = await db.query.topics.findMany({
            where: and(
                eq(topics.user_id, req.user.id),
                eq(topics.career_path_id, careerPath),
                eq(topics.resume_lang, lang)
            )
        })
        return items
    });

    // save all topics related to single experience

    app.patch('/topics/:careerPath/:lang/:experience/:id', { onRequest: [app.auth] }, async (req, reply) => {


        const parsedIncomingItem = updateTopicSchema.safeParse(req.body)
        if (!parsedIncomingItem.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const { experience, careerPath, lang } = expTopicSchema.parse(req.params)

        const existingItem = await db.query.topics.findFirst({
            where: and(
                eq(topics.user_id, req.user.id),
                eq(topics.experience_id, experience),
                eq(topics.resume_lang, lang),
                eq(topics.career_path_id, careerPath),
                eq(topics.id, parsedIncomingItem.data.id)
            )
        })
        if (!existingItem) throw new AppError(ERRORS.NOT_FOUND);

        const newTopic: Topic = {
            topic: parsedIncomingItem.data.topic,
            preTopic: existingItem.topic_text.preTopic
        }

        const updated = {
            ...existingItem,
            topic_text: newTopic
        }

        await db.update(topics)
            .set({ topic_text: newTopic }) // Write the new JSON blob
            .where(
                and(
                    eq(topics.id, parsedIncomingItem.data.id),
                    eq(topics.user_id, req.user.id)
                )
            );     // To the correct row

        return updated;
    })


    // regenerate all topics once again (only here the items would need to be inserted to the data base upon creation be an agent) This would return the ids, of freshly created items, once the answer is received, the frontend would call get option
    // Run generate all topics agent
    // Insert those into the data base
    // Query those from the data base once again, to get items with ID assigned
    // Return all items to the frontend

    app.post('/topics/generate_all/:careerPath/:lang/:experience', { onRequest: app.auth }, async (req, reply) => {

        const { lang, careerPath, experience } = expTopicSchema.parse(req.params)

        trackGenerateAll(req.user.id, experience);
        try {
            const newTopics = await topicsAgent.invoke({
                expId: experience,
                careerPathId: careerPath,
                resumeLang: lang
            })

            if (!newTopics) throw new AppError(ERRORS.AI_ERROR);

            const topicItems: TopicDbInsert[] = newTopics.careerPathTopics.map((item) => {
                return {
                    user_id: req.user.id,
                    resume_lang: lang,
                    career_path_id: careerPath,
                    experience_id: experience,
                    topic_text: item
                } as TopicDbInsert
            })

            // Remove existing topics for this experience before inserting new ones
            await db.delete(topics).where(
                and(
                    eq(topics.user_id, req.user.id),
                    eq(topics.career_path_id, careerPath),
                    eq(topics.experience_id, experience),
                    eq(topics.resume_lang, lang)
                )
            );

            const inserted = await db.insert(topics)
                .values(topicItems)
                .returning()

            return reply.status(201).send(inserted)
        } finally {
            untrackGenerateAll(req.user.id, experience);
        }
    })


    // regenerate sngle topic
    // Run generate all topics agent
    // Insert the item into the data base
    // Query the item from the data base once again, to get item's new ID assigned
    // Return a single item to the frontend

    app.post('/topics/generate_single/:careerPath/:lang/:experience', { onRequest: app.auth }, async (req, reply) => {

        const { lang, careerPath, experience } = expTopicSchema.parse(req.params)

        const parsedBody = expSingleTopicSchema.safeParse(req.body)
        if (!parsedBody.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const topicData = await db.query.topics.findFirst({
            where: and(
                eq(topics.id, parsedBody.data.id),
                eq(topics.user_id, req.user.id)
            )
        })
        if (!topicData) throw new AppError(ERRORS.NOT_FOUND);

        const careerPathData = await db.query.careerPaths.findFirst({
            where: and(
                eq(careerPaths.id, careerPath),
                eq(careerPaths.user_id, req.user.id)
            )
        })
        if (!careerPathData) throw new AppError(ERRORS.NOT_FOUND);

        const careerPathAdjusted: CareerPath = {
            name: careerPathData.name,
            description: careerPathData.description
        }

        trackRegenerate(req.user.id, parsedBody.data.id);
        try {
            const newTopic = await generateSingleTopic(
                careerPathAdjusted,
                topicData.topic_text.preTopic,
                lang,
                parsedBody.data.userHint,
                parsedBody.data.topic
            )

            if (!newTopic) throw new AppError(ERRORS.AI_ERROR);

            const updated = {
                ...topicData,
                topic_text: newTopic
            }

            await db.update(topics)
                .set({ topic_text: newTopic }) // Write the new JSON blob
                .where(eq(topics.id, topicData.id));

            return updated
        } finally {
            untrackRegenerate(req.user.id, parsedBody.data.id);
        }
    })



    // create single topic
    app.post('/topics/:careerPath/:lang/:experience', { onRequest: [app.auth] }, async (req, reply) => {

        const { careerPath, lang, experience } = expTopicSchema.parse(req.params)

        const bodySchema = z.object({ topic_text: topicSchema })

        const parsedTopic = bodySchema.safeParse(req.body)
        if (!parsedTopic.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const topic: Topic = {
            topic: parsedTopic.data.topic_text.topic,
            preTopic: {
                redefinedTopic: '',
                refinedQuotes: []
            }
        }


        const [inserted] = await db.insert(topics).values({
            career_path_id: careerPath,
            user_id: req.user.id,
            experience_id: experience,
            resume_lang: lang,
            topic_text: topic
        }).returning()

        return reply.status(201).send(inserted)
    })

    // delete single topic
    app.delete('/topics/:careerPath/:lang/:experience/:id', { onRequest: [app.auth] }, async (req, reply) => {

        const { careerPath, lang, experience } = expTopicSchema.parse(req.params)
        const { id } = z.object({ id: z.coerce.number().int().positive() }).parse(req.params)

        const deleted = await db.delete(topics)
            .where(
                and(
                    eq(topics.id, id),
                    eq(topics.user_id, req.user.id),
                    eq(topics.career_path_id, careerPath),
                    eq(topics.experience_id, experience),
                    eq(topics.resume_lang, lang)
                )
            )
            .returning()

        if (deleted.length === 0) throw new AppError(ERRORS.NOT_FOUND);

        return reply.status(204).send()
    })


    // ── Generation status (for restoring spinners after page refresh) ──

    app.get('/topics/generation-status', { onRequest: [app.auth] }, async (req) => {
        return getActiveGenerations(req.user.id);
    })
}