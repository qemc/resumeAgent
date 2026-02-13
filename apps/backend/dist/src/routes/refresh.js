import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { AppError, ERRORS } from "../../utils/errors";
export async function refreshRoutes(app) {
    app.post('/auth/refresh', async (req, reply) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            throw new AppError(ERRORS.UNAUTHORIZED);
        try {
            // the refresh token has an id of the user inside
            const decoded = app.jwt.verify(refreshToken);
            // querying db fot the user data to sign the jwt
            const user = await db.query.users.findFirst({
                where: eq(users.id, decoded.id)
            });
            if (!user)
                throw new AppError(ERRORS.UNAUTHORIZED);
            // creating new jwt for the user
            const newAccessToken = app.jwt.sign({
                id: user.id,
                email: user.email
            }, { expiresIn: '15m' });
            return { accessToken: newAccessToken };
        }
        catch (err) {
            throw new AppError(ERRORS.UNAUTHORIZED);
        }
    });
}
//# sourceMappingURL=refresh.js.map