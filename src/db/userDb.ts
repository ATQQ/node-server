import { query } from '@/lib/dbConnect/mysql'
import { User } from '@/db/modal'
import { selectTableByModel } from '@/utils/sqlUtil'

export function selectUserByUsername(username: string): Promise<User[]> {
  const { sql, params } = selectTableByModel('user', {
    data: { username },
  })
  return query<User[]>(sql, ...params)
}
