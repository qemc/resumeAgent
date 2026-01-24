import {
    sqliteTable,
    text,
    integer
} from 'drizzle-orm/sqlite-core'

import {
    type Contact,
    type Skill,
    type Language,
    type Interest,
    type ExperienceInput,
    type CertificateInput,
    type ProjectInput
} from "@resume-builder/shared";




export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const resumes = sqliteTable('resumes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    user_id: integer('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    resume_lang: text('resume_lang').notNull(),
    contact: text('contact', { mode: 'json' })
        .$type<Contact>()
        .notNull(),
    skills: text('skills', { mode: 'json' })
        .$type<Skill[]>()
        .notNull(),
    languages: text('languages', { mode: 'json' })
        .$type<Language[]>()
        .notNull(),
    interests: text('interests', { mode: 'json' })
        .$type<Interest[]>()
        .notNull(),
    summary: text('summary')
})

export const experiences = sqliteTable('experiences', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    user_id: integer('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    resume_lang: text('resume_lang').notNull(), // 'EN' | 'PL'
    experience: text('experience', { mode: 'json' })
        .$type<ExperienceInput>()
        .notNull()
})

export const certificates = sqliteTable('certificates', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    user_id: integer('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    resume_lang: text('resume_lang').notNull(), // 'EN' | 'PL'
    certificate: text('certificate', { mode: 'json' })
        .$type<CertificateInput>()
        .notNull()
})

export const projects = sqliteTable('projects', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    user_id: integer('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    resume_lang: text('resume_lang').notNull(), // 'EN' | 'PL'
    project: text('project', { mode: 'json' })
        .$type<ProjectInput>()
        .notNull()
})




