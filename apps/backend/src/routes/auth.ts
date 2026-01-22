import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { verifyPasswd } from "../../utils/password";
import { AppError, ERRORS } from "../../utils/errors";

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
})

export async function authRoutes(app: FastifyInstance) {
    app.post('/auth/login', async (req, reply) => {

        // parsing the request to check if is valid
        const parse = bodySchema.safeParse(req.body)

        if (!parse.success) { throw new AppError(ERRORS.INVALID_REQUEST) }
        const { email, password } = parse.data

        // querying the db in search of the user from the request
        const user = await db.query.users.findFirst({
            where: eq(users.email, email)
        })
        if (!user) { throw new AppError(ERRORS.INVALID_LOGIN) }

        // passwd verify
        const isValid = await verifyPasswd(password, user.password)
        if (!isValid) { throw new AppError(ERRORS.INVALID_LOGIN) }

        // returning signed jwt
        const token = app.jwt.sign({
            id: user.id,
            email: user.email
        },
            { expiresIn: '15m' }
        )

        const refreshToken = app.jwt.sign(
            { id: user.id },
            { expiresIn: '7d' }
        )

        reply.setCookie('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: false, // to be changed
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60
        })

        return {
            accessToken: token
        }
    })

    app.post('/auth/logout', async (req, reply) => {

        reply.clearCookie('refreshToken');
        return {
            message: 'Logged out'
        };
    });
}