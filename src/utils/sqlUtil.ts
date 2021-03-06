import { lowCamel2Underscore } from './stringUtil'

interface SqlData {
    sql: string
    params: string[]
}
interface Options {
    data?: any,
    columns?: string[]
}

export function selectTableByData(table: string, options: Options = {}): SqlData {
    const { data = {}, columns = [] } = options
    if (!isObject(data)) return { sql: '', params: [] }
    const column = (columns?.length > 0) ? `${columns.join(',')}` : '*'
    const keys = Object.keys(data)
    const where = (keys?.length > 0) ? `where ${keys.map(key => `${lowCamel2Underscore(key)} = ?`).join(' and ')}` : ''
    const values = keys.map(key => data[key])
    const sql = `select ${column} from ${table} ${where}`.trim()
    return {
        sql,
        params: values
    }
}


function isObject(data): boolean {
    return data instanceof Object && typeof data !== 'function'
}