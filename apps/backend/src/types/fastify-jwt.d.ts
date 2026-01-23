import "@fastify/jwt"
import { FastifyRequest, FastifyReply } from 'fastify';

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            id: number;
            email?: string
        }
        user: {
            id: number;
            email: string
        }
    }
}

declare module 'fastify' {
    export interface FastifyInstance {
        auth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    }
}