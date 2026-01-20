import {
    sqliteTable,
    text,
    integer
} from 'drizzle-orm/sqlite-core'

import type {
    Resume
} from "@resume-builder/shared";


type ResumeDb = Omit<Resume, 'id' | 'resumeLanguage' | 'userId'>


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
    resume: text('resume', { mode: 'json' })
        .$type<ResumeDb>()
        .notNull()
})



// To do:
// Implement DB structure
// Users for user data
// resumes for resumes