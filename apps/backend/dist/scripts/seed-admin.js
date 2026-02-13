import 'dotenv/config';
import { hash } from "crypto";
import { db } from "../src/db";
import { users } from "../src/db/schema";
import { hashPasswd } from "../utils/password";
async function main() {
    const email = process.env['ADMIN_EMAIL'];
    const password = process.env['ADMIN_PASSWD'];
    const hashedPasswd = await hashPasswd(password);
    await db.insert(users).values({
        email: email,
        password: hashedPasswd
    });
    console.log("User created with secure password.");
}
main();
//# sourceMappingURL=seed-admin.js.map