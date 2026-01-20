import "@fastify/jwt"

declare module "@fastify/jwt" {
    interface fastifyJwt {
        payload: {
            id: number;
            email: string
        }
        user: {
            id: number;
            email: string
        }
    }
}