import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { careerPaths } from "../db/schema";
import { AppError, ERRORS } from "../../utils/errors";
const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});
const langParamSchema = z.object({
    lang: z.enum(['EN', 'PL']),
});
const careerPathSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
});
const createCareerPathSchema = z.object({
    resume_lang: z.enum(['EN', 'PL']),
    name: z.string().min(1),
    description: z.string().min(1),
});
export async function careerPathRoutes(app) {
    // GET all career paths for user by language
    app.get('/career-paths/:lang', { onRequest: [app.auth] }, async (req) => {
        const { lang } = langParamSchema.parse(req.params);
        const items = await db.query.careerPaths.findMany({
            where: and(eq(careerPaths.user_id, req.user.id), eq(careerPaths.resume_lang, lang))
        });
        return items;
    });
    // GET single career path by id
    app.get('/career-path/:id', { onRequest: [app.auth] }, async (req) => {
        const { id } = idParamSchema.parse(req.params);
        const item = await db.query.careerPaths.findFirst({
            where: and(eq(careerPaths.id, id), eq(careerPaths.user_id, req.user.id))
        });
        if (!item)
            throw new AppError(ERRORS.NOT_FOUND);
        return item;
    });
    // POST create new career path
    app.post('/career-paths', { onRequest: [app.auth] }, async (req, reply) => {
        const parse = createCareerPathSchema.safeParse(req.body);
        if (!parse.success)
            throw new AppError(ERRORS.INVALID_REQUEST);
        const [inserted] = await db.insert(careerPaths).values({
            user_id: req.user.id,
            resume_lang: parse.data.resume_lang,
            name: parse.data.name,
            description: parse.data.description,
        }).returning();
        return reply.status(201).send(inserted);
    });
    // PATCH update career path (name and/or description)
    app.patch('/career-paths/:id', { onRequest: [app.auth] }, async (req) => {
        const { id } = idParamSchema.parse(req.params);
        const existing = await db.query.careerPaths.findFirst({
            where: and(eq(careerPaths.id, id), eq(careerPaths.user_id, req.user.id))
        });
        if (!existing)
            throw new AppError(ERRORS.NOT_FOUND);
        const parse = careerPathSchema.partial().safeParse(req.body);
        if (!parse.success)
            throw new AppError(ERRORS.INVALID_REQUEST);
        const updateData = {
            updatedAt: new Date(),
        };
        if (parse.data.name !== undefined)
            updateData.name = parse.data.name;
        if (parse.data.description !== undefined)
            updateData.description = parse.data.description;
        await db.update(careerPaths)
            .set(updateData)
            .where(eq(careerPaths.id, id));
        return {
            ...existing,
            ...updateData,
        };
    });
    // DELETE career path
    app.delete('/career-paths/:id', { onRequest: [app.auth] }, async (req, reply) => {
        const { id } = idParamSchema.parse(req.params);
        const deleted = await db.delete(careerPaths)
            .where(and(eq(careerPaths.id, id), eq(careerPaths.user_id, req.user.id)))
            .returning();
        if (deleted.length === 0)
            throw new AppError(ERRORS.NOT_FOUND);
        return reply.status(204).send();
    });
}
//# sourceMappingURL=careerPaths.js.map