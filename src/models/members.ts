import Client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const {
    TOKEN_SECRET,
    SALTROUNDS
} = process.env

export type Member = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    phone: number,
    current?: boolean,
    dob: Date
}

export class MemberStore {
    async index(): Promise<Member[]> {
        try{
            const conn = await Client.connect();
            const sql = "SELECT * FROM members;"
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async register(m: Member): Promise<Member> {
        try {
            const conn = await Client.connect()
            const sql = "INSERT INTO members (first_name, last_name, password_digest, email, phone, dob) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;"
            const password_digest = bcrypt.hashSync(
                m.password + TOKEN_SECRET,
                parseInt(SALTROUNDS as string));
            const result = await conn.query(sql, [m.first_name, m.last_name, password_digest, m.email, m.phone, m.dob]);
            conn.release();
            return result.rows[0]
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async authenticate(email: string, password: string): Promise<Member | null> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT password_digest FROM members WHERE email=$1;'
            const result = await conn.query(sql, [email])
            conn.release()
            if (result.rows.length) {
                const user = result.rows[0]
                if (bcrypt.compareSync(password + TOKEN_SECRET, user.password_digest)) {
                    const secured_result = await conn.query("SELECT * FROM members WHERE email=$1;", [email])
                    const user_info = secured_result.rows[0]
                    return user_info
                }
            }
            return null
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
}