import 'dotenv/config';
import Fastify, { type FastifyRegister, type FastifyReply, type FastifyRequest } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { registerRoutes } from './routes/index';
import fastifyJwt from '@fastify/jwt';
import cookie from '@fastify/cookie';


const JWT_SECRET_KEY = process.env['JWT_SECRET_KEY'];
const COOKIE_SECRET_KEY = process.env['COOKIE_SECRET_KEY']
const app = Fastify({ logger: true });

app.register(fastifyCors, { origin: 'http://localhost:5173' });
app.register(fastifyJwt, { secret: JWT_SECRET_KEY });

app.register(cookie, {
    secret: COOKIE_SECRET_KEY,
    hook: 'onRequest'
});
await registerRoutes(app)

app.decorate('auth', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err)
    }
})

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('Server running at http://localhost:3000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
start()