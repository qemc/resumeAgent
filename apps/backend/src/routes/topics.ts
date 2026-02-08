import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { topics } from "../db/schema";
import { AppError, ERRORS } from "../../utils/errors";
import type { Topic } from "../types/agent";

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
    careerPath: z.coerce.number().int().positive(),
    lang: z.enum(['EN', 'PL']),
    experience: z.coerce.number().int().positive(),
    id: z.coerce.number().int().positive(),
})

const topicSchema = z.object({
    topic: z.string(),
})



export async function careerPathRoutes(app: FastifyInstance) {

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

    app.patch('/topcis/:careerPath/:lang/:experience/:id', { onRequest: [app.auth] }, async (req, reply) => {

        const { experience, careerPath, lang, id } = expSingleTopicSchema.parse(req.params)

        const existingItem = await db.query.topics.findFirst({
            where: and(
                eq(topics.user_id, req.user.id),
                eq(topics.experience_id, experience),
                eq(topics.resume_lang, lang),
                eq(topics.career_path_id, careerPath),
                eq(topics.id, id)
            )
        })
        if (!existingItem) throw new AppError(ERRORS.NOT_FOUND);

        const updateTopicSchema = z.object({
            topic: z.string()
        })

        const parsedIncomingItem = updateTopicSchema.safeParse(req.body)

        if (!parsedIncomingItem.success) throw new AppError(ERRORS.INVALID_REQUEST);

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
            .where(eq(topics.id, id));     // To the correct row

        return updated;
    })


    // regenerate all topics once again (only here the items would need to be inserted to the data base upon creation be an agent) This would return the ids, of freshly created items, once the answer is received, the frontend would call get option
    // Run generate all topics agent
    // Insert those into the data base
    // Query those from the data base once again, to get items with ID assigned
    // Return all items to the frontend

    app.post('/topics/generate_all/:careerPath/:lang/:experience', { onRequest: app.auth }, async (req, reply) => {

        const newTopics = '' // here agent generates new topics

        if (!newTopics) throw new AppError(ERRORS.AI_ERROR);

    })


    // regenerate sngle topic
    // Run generate all topics agent
    // Insert the item into the data base
    // Query the item from the data base once again, to get item's new ID assigned
    // Return a single item to the frontend



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
}