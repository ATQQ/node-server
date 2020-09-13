import { query } from '@/lib/dbConnect'
import { User } from '@/db/modal'

export async function selectUserByUsername(username: string):Promise<User[]> {
    const sql = 'select * from user where account = ?'
    return await query<User[]>(sql, username)
}