import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = parseInt(process.env['SALT_ROUNDS']);
export async function hashPasswd(passwd) {
    return await bcrypt.hash(passwd, SALT_ROUNDS);
}
export async function verifyPasswd(hashedPasswd, incommingPasswd) {
    return await bcrypt.compare(hashedPasswd, incommingPasswd);
}
//# sourceMappingURL=password.js.map