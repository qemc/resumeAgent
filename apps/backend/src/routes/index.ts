import type { FastifyInstance } from 'fastify';
import { resumeRoutes } from './resume';
import { authRoutes } from './auth';

export async function registerRoutes(fastify: FastifyInstance) {
    // Register all route modules
    await fastify.register(resumeRoutes);
    await fastify.register(authRoutes);
}
