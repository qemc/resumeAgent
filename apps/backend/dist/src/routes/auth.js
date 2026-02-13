import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { hashPasswd, verifyPasswd } from "../../utils/password";
import { AppError, ERRORS } from "../../utils/errors";
const bodyLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});
export async function authRoutes(app) {
    app.post('/auth/login', async (req, reply) => {
        // parsing the request to check if is valid
        const parse = bodyLoginSchema.safeParse(req.body);
        if (!parse.success) {
            throw new AppError(ERRORS.INVALID_REQUEST);
        }
        const { email, password } = parse.data;
        // querying the db in search of the user from the request
        const user = await db.query.users.findFirst({
            where: eq(users.email, email)
        });
        if (!user) {
            throw new AppError(ERRORS.INVALID_LOGIN);
        }
        // passwd verify
        const isValid = await verifyPasswd(password, user.password);
        if (!isValid) {
            throw new AppError(ERRORS.INVALID_LOGIN);
        }
        // returning signed jwt
        const token = app.jwt.sign({
            id: user.id,
            email: user.email
        }, { expiresIn: '15m' });
        const refreshToken = app.jwt.sign({ id: user.id }, { expiresIn: '7d' });
        reply.setCookie('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60
        });
        return {
            accessToken: token
        };
    });
    app.post('/auth/logout', async (req, reply) => {
        reply.clearCookie('refreshToken');
        return {
            message: 'Logged out'
        };
    });
    app.post('/auth/register', async (req, reply) => {
        if (process.env.ENABLE_REGISTRATION === 'false') {
            throw new AppError(ERRORS.REGISTRATION_DISABLED);
        }
        const parse = bodyLoginSchema.safeParse(req.body);
        if (!parse.success) {
            throw new AppError(ERRORS.INVALID_REQUEST);
        }
        const { email, password } = parse.data;
        const existingUsers = await db.query.users.findMany({
            where: eq(users.email, email)
        });
        if (existingUsers.length > 0)
            throw new AppError(ERRORS.USER_ALREADY_EXISTS);
        const hashedPasswd = await hashPasswd(password);
        const [newUser] = await db.insert(users).values({
            email: email,
            password: hashedPasswd
        }).returning();
        const token = app.jwt.sign({
            id: newUser.id,
            email: newUser.email
        }, { expiresIn: '15m' });
        const refreshToken = app.jwt.sign({ id: newUser.id }, { expiresIn: '7d' });
        reply.setCookie('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60
        });
        return {
            accessToken: token
        };
    });
    app.get('/auth/me', { onRequest: [app.auth] }, async (req, reply) => {
        const user = await db.query.users.findFirst({
            where: eq(users.id, req.user.id)
        });
        if (!user)
            throw new AppError(ERRORS.USER_NOT_FOUND);
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
    });
}
//# sourceMappingURL=auth.js.map