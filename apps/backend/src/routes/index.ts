/**
 * Routes Index
 * 
 * Register all route modules here.
 */

import type { FastifyInstance } from 'fastify';
import { resumeRoutes } from './resume';

export async function registerRoutes(fastify: FastifyInstance) {
    // Register all route modules
    await fastify.register(resumeRoutes);

    // Add more route modules here as needed:
    // await fastify.register(workflowRoutes);
}
