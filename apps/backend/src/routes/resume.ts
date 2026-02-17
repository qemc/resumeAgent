import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { experiences, certificates, projects, resumes } from "../db/schema";
import { AppError, ERRORS } from "../../utils/errors";


const experienceSchema = z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean(),
    description: z.string(),
    highlights: z.array(z.string()).optional(),
});

const certificateSchema = z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    expiryDate: z.string().optional(),
    credentialId: z.string().optional(),
    url: z.string().optional(),
});

const projectSchema = z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    url: z.string().optional(),
});

const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

const langParamSchema = z.object({
    lang: z.enum(['EN', 'PL']),
});

const langQuerySchema = z.object({
    lang: z.enum(['EN', 'PL']).optional(),
});


const contactSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    location: z.string().optional(),
});

const skillSchema = z.object({
    id: z.string(),
    name: z.string(),
    level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
    category: z.string().optional(),
});

const languageSchema = z.object({
    id: z.string(),
    name: z.string(),
    level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'Native']),
});

const interestSchema = z.object({
    id: z.string(),
    name: z.string(),
});

const resumeSchema = z.object({
    resume_lang: z.enum(['EN', 'PL']),
    contact: contactSchema,
    skills: z.array(skillSchema),
    languages: z.array(languageSchema),
    interests: z.array(interestSchema),
    summary: z.string().optional(),
});


export async function resumeRoutes(app: FastifyInstance) {


    app.get('/experiences/:lang', { onRequest: [app.auth] }, async (req) => {
        const { lang } = langParamSchema.parse(req.params);
        const items = await db.query.experiences.findMany({
            where: and(eq(experiences.user_id, req.user.id), eq(experiences.resume_lang, lang))
        });
        return items;
    });

    app.post('/experiences', { onRequest: [app.auth] }, async (req, reply) => {

        const bodySchema = z.object({
            resume_lang: z.enum(['EN', 'PL']),
            experience: experienceSchema,
        });
        const parse = bodySchema.safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const [inserted] = await db.insert(experiences).values({
            user_id: req.user.id,
            resume_lang: parse.data.resume_lang,
            experience: parse.data.experience
        }).returning();

        return reply.status(201).send(inserted);
    });

    app.patch('/experiences/:id', { onRequest: [app.auth] }, async (req) => {
        const { id } = idParamSchema.parse(req.params);

        const existing = await db.query.experiences.findFirst({
            where: and(eq(experiences.id, id), eq(experiences.user_id, req.user.id))
        });
        if (!existing) throw new AppError(ERRORS.NOT_FOUND);

        const body = req.body as Record<string, unknown>;
        const descriptionChanged = body._descriptionChanged !== false;
        delete body._descriptionChanged;

        const parse = experienceSchema.partial().safeParse(body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        if (descriptionChanged) {
            const now = new Date();
            const updated = { ...existing.experience, ...parse.data, updatedAt: now };
            await db.update(experiences)
                .set({ experience: updated, updatedAt: now })
                .where(eq(experiences.id, id));
            return { id, experience: updated };
        } else {
            const updated = { ...existing.experience, ...parse.data };
            await db.update(experiences)
                .set({ experience: updated })
                .where(eq(experiences.id, id));
            return { id, experience: updated };
        }
    });

    app.delete('/experiences/:id', { onRequest: [app.auth] }, async (req, reply) => {
        const { id } = idParamSchema.parse(req.params);

        await db.delete(experiences)
            .where(and(eq(experiences.id, id), eq(experiences.user_id, req.user.id)));

        return reply.status(204).send();
    });


    app.get('/certificates/:lang', { onRequest: [app.auth] }, async (req) => {
        const { lang } = langParamSchema.parse(req.params);
        const items = await db.query.certificates.findMany({
            where: and(eq(certificates.user_id, req.user.id), eq(certificates.resume_lang, lang))
        });
        return items;
    });

    app.post('/certificates', { onRequest: [app.auth] }, async (req, reply) => {

        const bodySchema = z.object({
            resume_lang: z.enum(['EN', 'PL']),
            certificate: certificateSchema,
        });
        const parse = bodySchema.safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const [inserted] = await db.insert(certificates).values({
            user_id: req.user.id,
            resume_lang: parse.data.resume_lang,
            certificate: parse.data.certificate
        }).returning();

        return reply.status(201).send(inserted);
    });

    app.patch('/certificates/:id', { onRequest: [app.auth] }, async (req) => {
        const { id } = idParamSchema.parse(req.params);

        const existing = await db.query.certificates.findFirst({
            where: and(eq(certificates.id, id), eq(certificates.user_id, req.user.id))
        });
        if (!existing) throw new AppError(ERRORS.NOT_FOUND);

        const body = req.body as Record<string, unknown>;
        const descriptionChanged = body._descriptionChanged !== false;
        delete body._descriptionChanged;

        const parse = certificateSchema.partial().safeParse(body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const updated = descriptionChanged
            ? { ...existing.certificate, ...parse.data, updatedAt: new Date() }
            : { ...existing.certificate, ...parse.data };

        await db.update(certificates)
            .set({ certificate: updated })
            .where(eq(certificates.id, id));

        return { id, certificate: updated };
    });

    app.delete('/certificates/:id', { onRequest: [app.auth] }, async (req, reply) => {
        const { id } = idParamSchema.parse(req.params);

        await db.delete(certificates)
            .where(and(eq(certificates.id, id), eq(certificates.user_id, req.user.id)));

        return reply.status(204).send();
    });


    app.get('/projects/:lang', { onRequest: [app.auth] }, async (req) => {
        const { lang } = langParamSchema.parse(req.params);
        const items = await db.query.projects.findMany({
            where: and(eq(projects.user_id, req.user.id), eq(projects.resume_lang, lang))
        });
        return items;
    });

    app.post('/projects', { onRequest: [app.auth] }, async (req, reply) => {
        const bodySchema = z.object({
            resume_lang: z.enum(['EN', 'PL']),
            project: projectSchema,
        });
        const parse = bodySchema.safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const [inserted] = await db.insert(projects).values({
            user_id: req.user.id,
            resume_lang: parse.data.resume_lang,
            project: parse.data.project
        }).returning();

        return reply.status(201).send(inserted);
    });

    app.patch('/projects/:id', { onRequest: [app.auth] }, async (req) => {
        const { id } = idParamSchema.parse(req.params);

        const existing = await db.query.projects.findFirst({
            where: and(eq(projects.id, id), eq(projects.user_id, req.user.id))
        });
        if (!existing) throw new AppError(ERRORS.NOT_FOUND);

        const body = req.body as Record<string, unknown>;
        const descriptionChanged = body._descriptionChanged !== false;
        delete body._descriptionChanged;

        const parse = projectSchema.partial().safeParse(body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const updated = descriptionChanged
            ? { ...existing.project, ...parse.data, updatedAt: new Date() }
            : { ...existing.project, ...parse.data };

        await db.update(projects)
            .set({ project: updated })
            .where(eq(projects.id, id));

        return { id, project: updated };
    });

    app.delete('/projects/:id', { onRequest: [app.auth] }, async (req, reply) => {
        const { id } = idParamSchema.parse(req.params);

        await db.delete(projects)
            .where(and(eq(projects.id, id), eq(projects.user_id, req.user.id)));

        return reply.status(204).send();
    });



    app.get('/resume/:lang', { onRequest: [app.auth] }, async (req) => {
        const { lang } = langParamSchema.parse(req.params);
        const resume = await db.query.resumes.findFirst({
            where: and(eq(resumes.user_id, req.user.id), eq(resumes.resume_lang, lang))
        });
        if (!resume) throw new AppError(ERRORS.RESUME_NOT_FOUND);

        return resume;
    });


    app.post('/resume', { onRequest: [app.auth] }, async (req, reply) => {
        const parse = resumeSchema.safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);


        const existing = await db.query.resumes.findFirst({
            where: and(eq(resumes.user_id, req.user.id), eq(resumes.resume_lang, parse.data.resume_lang))
        });
        if (existing) throw new AppError(ERRORS.USER_ALREADY_EXISTS); // reusing error for "already exists"

        const [inserted] = await db.insert(resumes).values({
            user_id: req.user.id,
            resume_lang: parse.data.resume_lang,
            contact: parse.data.contact,
            skills: parse.data.skills,
            languages: parse.data.languages,
            interests: parse.data.interests,
        }).returning();

        return reply.status(201).send(inserted);
    });


    app.patch('/resume/:lang', { onRequest: [app.auth] }, async (req) => {
        const { lang } = langParamSchema.parse(req.params);
        const existing = await db.query.resumes.findFirst({
            where: and(eq(resumes.user_id, req.user.id), eq(resumes.resume_lang, lang))
        });
        if (!existing) throw new AppError(ERRORS.RESUME_NOT_FOUND);

        const parse = resumeSchema.partial().safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const updated = {
            resume_lang: lang,
            contact: parse.data.contact ?? existing.contact,
            skills: parse.data.skills ?? existing.skills,
            languages: parse.data.languages ?? existing.languages,
            interests: parse.data.interests ?? existing.interests,
            summary: parse.data.summary ?? existing.summary,
        };

        await db.update(resumes)
            .set(updated)
            .where(and(eq(resumes.user_id, req.user.id), eq(resumes.resume_lang, lang)));

        return { id: existing.id, ...updated };
    });


    app.delete('/resume/:lang', { onRequest: [app.auth] }, async (req, reply) => {
        const { lang } = langParamSchema.parse(req.params);
        await db.delete(resumes)
            .where(and(eq(resumes.user_id, req.user.id), eq(resumes.resume_lang, lang)));

        return reply.status(204).send();
    });
}