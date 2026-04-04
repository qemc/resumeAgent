import type { FastifyInstance, FastifyRegister, FastifyReply, FastifyRequest } from 'fastify';
import { resumeRoutes } from './resume';
import { authRoutes } from './auth';
import { refreshRoutes } from './refresh';
import { careerPathRoutes } from './careerPaths';
import { topicRoutes } from './topics';
import { AppError, ERRORS } from '../../utils/errors';

const expectedApiKey = process.env['INTERNAL_API_KEY']

async function verifyInternalRoutes(request: FastifyRequest, reply: FastifyReply) {

    const providedKey = request.headers['x-api-key']
    if (!expectedApiKey) {
        throw new AppError(ERRORS.INT_KEY_MISSCONFIG)
    }
    if (!providedKey || providedKey !== expectedApiKey) {
        throw new AppError(ERRORS.INT_KEY_MISSING)
    }
}
// routes for frontend integration 
export async function registerRoutes(fastify: FastifyInstance) {

    await fastify.register(resumeRoutes);
    await fastify.register(authRoutes);
    await fastify.register(refreshRoutes);
    await fastify.register(careerPathRoutes);
    await fastify.register(topicRoutes);
}

// routes for internal integration 
export async function registerInternalRoutes(fastify: FastifyInstance) {

    fastify.addHook('onRequest', verifyInternalRoutes)
}