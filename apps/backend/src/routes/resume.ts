import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { experiences, certificates, projects, resumes } from "../db/schema";
import { AppError, ERRORS } from "../../utils/errors";

// =============================================================================
// Zod Schemas for Validation
// =============================================================================

const experienceSchema = z.object({
    company: z.string().min(1),
    position: z.string().min(1),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean(),
    description: z.string(),
    highlights: z.array(z.string()).optional(),
});

const certificateSchema = z.object({
    name: z.string().min(1),
    issuer: z.string().min(1),
    date: z.string(),
    expiryDate: z.string().optional(),
    credentialId: z.string().optional(),
});

const projectSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    technologies: z.array(z.string()),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

// Resume schemas
const contactSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    location: z.string().optional(),
});

const skillSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
    category: z.string().optional(),
});

const languageSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'Native']),
});

const interestSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
});

const resumeSchema = z.object({
    resume_lang: z.enum(['EN', 'PL']),
    contact: contactSchema,
    skills: z.array(skillSchema),
    languages: z.array(languageSchema),
    interests: z.array(interestSchema),
});

// =============================================================================
// Routes
// =============================================================================

export async function resumeRoutes(app: FastifyInstance) {

    // =========================================================================
    // EXPERIENCES
    // =========================================================================

    app.get('/experiences', { onRequest: [app.auth] }, async (req) => {
        const items = await db.query.experiences.findMany({
            where: eq(experiences.user_id, req.user.id)
        });
        return items;
    });

    app.post('/experiences', { onRequest: [app.auth] }, async (req, reply) => {
        const parse = experienceSchema.safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const [inserted] = await db.insert(experiences).values({
            user_id: req.user.id,
            experience: parse.data
        }).returning();

        return reply.status(201).send(inserted);
    });

    app.patch('/experiences/:id', { onRequest: [app.auth] }, async (req) => {
        const { id } = idParamSchema.parse(req.params);

        const existing = await db.query.experiences.findFirst({
            where: and(eq(experiences.id, id), eq(experiences.user_id, req.user.id))
        });
        if (!existing) throw new AppError(ERRORS.NOT_FOUND);

        const parse = experienceSchema.partial().safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const updated = { ...existing.experience, ...parse.data };

        await db.update(experiences)
            .set({ experience: updated })
            .where(eq(experiences.id, id));

        return { id, experience: updated };
    });

    app.delete('/experiences/:id', { onRequest: [app.auth] }, async (req, reply) => {
        const { id } = idParamSchema.parse(req.params);

        await db.delete(experiences)
            .where(and(eq(experiences.id, id), eq(experiences.user_id, req.user.id)));

        return reply.status(204).send();
    });

    // =========================================================================
    // CERTIFICATES
    // =========================================================================

    app.get('/certificates', { onRequest: [app.auth] }, async (req) => {
        const items = await db.query.certificates.findMany({
            where: eq(certificates.user_id, req.user.id)
        });
        return items;
    });

    app.post('/certificates', { onRequest: [app.auth] }, async (req, reply) => {
        const parse = certificateSchema.safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const [inserted] = await db.insert(certificates).values({
            user_id: req.user.id,
            certificate: parse.data
        }).returning();

        return reply.status(201).send(inserted);
    });

    app.patch('/certificates/:id', { onRequest: [app.auth] }, async (req) => {
        const { id } = idParamSchema.parse(req.params);

        const existing = await db.query.certificates.findFirst({
            where: and(eq(certificates.id, id), eq(certificates.user_id, req.user.id))
        });
        if (!existing) throw new AppError(ERRORS.NOT_FOUND);

        const parse = certificateSchema.partial().safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const updated = { ...existing.certificate, ...parse.data };

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

    // =========================================================================
    // PROJECTS
    // =========================================================================

    app.get('/projects', { onRequest: [app.auth] }, async (req) => {
        const items = await db.query.projects.findMany({
            where: eq(projects.user_id, req.user.id)
        });
        return items;
    });

    app.post('/projects', { onRequest: [app.auth] }, async (req, reply) => {
        const parse = projectSchema.safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const [inserted] = await db.insert(projects).values({
            user_id: req.user.id,
            project: parse.data
        }).returning();

        return reply.status(201).send(inserted);
    });

    app.patch('/projects/:id', { onRequest: [app.auth] }, async (req) => {
        const { id } = idParamSchema.parse(req.params);

        const existing = await db.query.projects.findFirst({
            where: and(eq(projects.id, id), eq(projects.user_id, req.user.id))
        });
        if (!existing) throw new AppError(ERRORS.NOT_FOUND);

        const parse = projectSchema.partial().safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const updated = { ...existing.project, ...parse.data };

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

    // =========================================================================
    // RESUME (contact, skills, languages, interests)
    // =========================================================================

    app.get('/resume', { onRequest: [app.auth] }, async (req) => {
        const resume = await db.query.resumes.findFirst({
            where: eq(resumes.user_id, req.user.id)
        });
        if (!resume) throw new AppError(ERRORS.RESUME_NOT_FOUND);

        return resume;
    });

    app.post('/resume', { onRequest: [app.auth] }, async (req, reply) => {
        const parse = resumeSchema.safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        // Check if resume already exists
        const existing = await db.query.resumes.findFirst({
            where: eq(resumes.user_id, req.user.id)
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

    app.patch('/resume', { onRequest: [app.auth] }, async (req) => {
        const existing = await db.query.resumes.findFirst({
            where: eq(resumes.user_id, req.user.id)
        });
        if (!existing) throw new AppError(ERRORS.RESUME_NOT_FOUND);

        const parse = resumeSchema.partial().safeParse(req.body);
        if (!parse.success) throw new AppError(ERRORS.INVALID_REQUEST);

        const updated = {
            resume_lang: parse.data.resume_lang ?? existing.resume_lang,
            contact: parse.data.contact ?? existing.contact,
            skills: parse.data.skills ?? existing.skills,
            languages: parse.data.languages ?? existing.languages,
            interests: parse.data.interests ?? existing.interests,
        };

        await db.update(resumes)
            .set(updated)
            .where(eq(resumes.user_id, req.user.id));

        return { id: existing.id, ...updated };
    });

    app.delete('/resume', { onRequest: [app.auth] }, async (req, reply) => {
        await db.delete(resumes)
            .where(eq(resumes.user_id, req.user.id));

        return reply.status(204).send();
    });
}