import { resumeRoutes } from './resume';
import { authRoutes } from './auth';
import { refreshRoutes } from './refresh';
import { careerPathRoutes } from './careerPaths';
import { topicRoutes } from './topics';
export async function registerRoutes(fastify) {
    // Register all route modules
    await fastify.register(resumeRoutes);
    await fastify.register(authRoutes);
    await fastify.register(refreshRoutes);
    await fastify.register(careerPathRoutes);
    await fastify.register(topicRoutes);
}
//# sourceMappingURL=index.js.map