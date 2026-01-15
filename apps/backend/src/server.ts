/**
 * Minimal Fastify Server
 *
 * A simple Hello World endpoint to verify the setup works.
 * Build this out however you want!
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });

// Enable CORS for frontend
await app.register(cors, { origin: 'http://localhost:5173' });

// Hello World endpoint
app.get('/', async () => {
    return { message: 'Hello World!' };
});

// Start server
const PORT = Number(process.env.PORT) || 3001;

app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
