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

import type {
    InferSelectModel
} from 'drizzle-orm';

import type { WriterRedefinedTopic } from '../types/agent';
import { uniqueIndex } from 'drizzle-orm/sqlite-core'



export type ExperienceDb = InferSelectModel<typeof experiences>;
export type AiEnhancedExperienceDb = InferSelectModel<typeof ai_enhanced_experience>;
export type CareerPathsDb = InferSelectModel<typeof careerPaths>;


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
        .notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})


export const ai_enhanced_experience = sqliteTable('ai_enhanced_experience', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    experience_id: integer('experience_id').references(() => experiences.id, { onDelete: 'cascade' })
        .notNull(),
    user_id: integer('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    resume_lang: text('resume_lang').notNull(), // 'EN' | 'PL'
    experience: text('experience', { mode: 'json' })
        .$type<WriterRedefinedTopic[]>()
        .notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (t) => ({
    unq: uniqueIndex('one_enhance_per_exp').on(t.user_id, t.experience_id)
}))



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

export const careerPaths = sqliteTable('career_paths', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    user_id: integer('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    resume_lang: text('resume_lang').notNull(), // 'EN' | 'PL'
    name: text('name').notNull(),
    description: text('description').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const topics = sqliteTable('topics', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    career_path_id: integer('career_path_id')
        .references(() => careerPaths.id, { onDelete: 'cascade' })
        .notNull(),
    experience_id: integer('experience_id')
        .references(() => experiences.id, { onDelete: 'cascade' })
        .notNull(),
    resume_lang: text('resume_lang').notNull(), // 'EN' | 'PL'
    previous_options: text('previous_options', { mode: 'json' })
        .$type<ProjectInput>()
        .notNull(),
    topic_text: text('topic_text').notNull(),
    approved: integer('approved', { mode: 'boolean' }).notNull().default(false),
    rejection_comment: text('rejection_comment'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const variations = sqliteTable('variations', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    topic_id: integer('topic_id')
        .references(() => topics.id, { onDelete: 'cascade' })
        .notNull(),
    resume_lang: text('resume_lang').notNull(), // 'EN' | 'PL'
    original_text: text('original_text').notNull(),
    variation_text: text('variation_text').notNull(),
    approved: integer('approved', { mode: 'boolean' }).notNull().default(false),
    rejection_comment: text('rejection_comment'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})
