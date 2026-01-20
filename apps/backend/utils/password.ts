import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = parseInt(process.env['SALT_ROUNDS'])

export async function hashPasswd(passwd: string): Promise<string> {
    return await bcrypt.hash(passwd, SALT_ROUNDS)
}

export async function verifyPasswd(hashedPasswd: string, incommingPasswd: string) {
    return await bcrypt.compare(hashedPasswd, incommingPasswd)
}
