import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { verifyPasswd } from "../../utils/password";
import { AppError, ERRORS } from "../../utils/errors";
import { access } from "fs";


export async function refreshRoutes(app: FastifyInstance) {

    app.post('/auth/refresh', async (req, reply) => {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) throw new AppError(ERRORS.UNAUTHORIZED);
        try {
            const decoded = app.jwt.verify<{ id: number }>(refreshToken);

            const user = await db.query.users.findFirst({
                where: eq(users.id, decoded.id)
            })
            if (!user) throw new AppError(ERRORS.UNAUTHORIZED);

            const newAccessToken = app.jwt.sign({
                id: user.id,
                email: user.email
            },
                { expiresIn: '15m' }
            )

            return { accessToken: newAccessToken }

        } catch (err) {
            throw new AppError(ERRORS.UNAUTHORIZED)
        }
    })

}