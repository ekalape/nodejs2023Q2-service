import * as bcrypt from "bcrypt"
import 'dotenv/config';

export async function passwordEncryption(pass: string) {
    const salt = Number(process.env.CRYPT_SALT);
    const hash = await bcrypt.hash(pass, salt)
    return hash;
}
