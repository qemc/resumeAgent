import type { FastifyInstance } from 'fastify';
import { resumeRoutes } from './resume';
import { authRoutes } from './auth';
import { refreshRoutes } from './refresh';
import { careerPathRoutes } from './careerPaths';

export async function registerRoutes(fastify: FastifyInstance) {
    // Register all route modules
    await fastify.register(resumeRoutes);
    await fastify.register(authRoutes);
    await fastify.register(refreshRoutes);
    await fastify.register(careerPathRoutes);
}
