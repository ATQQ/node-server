import { query } from '@/lib/dbConnect'
import { User } from '@/db/modal'

export async function selectUserByUsername(username: string) {
    const sql = 'select * from user where username = ?'
    return await query<User>(sql, username)
}