import { lowCamel2Underscore } from './stringUtil'

interface SqlData {
    sql: string
    params: string[]
}
interface Options {
    data?: any,
    columns?: string[]
}

export function selectTableByModel(table: string, options: Options = {}): SqlData {
    const { columns = [] } = options
    let { data = {} } = options
    if (!isObject(data)) return { sql: '', params: [] }
    data = removeUndefKey(data)

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

export function deleteTableByModel(table: string, model: unknown): SqlData {
    if (!isOkModel(model)) return { sql: '', params: [] }
    model = removeUndefKey(model)

    const keys = Object.keys(model)
    const where = `where ${keys.map(key => `${lowCamel2Underscore(key)} = ?`).join(' and ')}`
    const values = keys.map(key => model[key])
    const sql = `delete from ${table} ${where}`.trim()
    return {
        sql,
        params: values
    }
}

export function insertTableByModel(table: string, model: unknown): SqlData {
    if (!isOkModel(model)) return { sql: '', params: [] }
    model = removeUndefKey(model)

    const keys = Object.keys(model)
    const values = keys.map(key => model[key])

    const sql = `insert into ${table} (${keys.map(lowCamel2Underscore).join(',')}) values (${new Array(keys.length).fill('?').join(',')})`
    return {
        sql,
        params: values
    }
}

export function updateTableByModel(table: string, model: unknown, query: unknown): SqlData {
    if (!isOkModel(model) || !isOkModel(query)) return { sql: '', params: [] }
    model = removeUndefKey(model)
    query = removeUndefKey(query)

    const updateModelKeys = Object.keys(model)
    let values = updateModelKeys.map(key => model[key])
    const queryModelKeys = Object.keys(query)
    values = values.concat(queryModelKeys.map(key => query[key]))

    const where = `where ${queryModelKeys.map(key => `${lowCamel2Underscore(key)} = ?`).join(' and ')}`
    const sql = `update ${table} set ${updateModelKeys.map(key => `${lowCamel2Underscore(key)} = ?`).join(',')} ${where}`
    return {
        sql,
        params: values
    }
}

function isObject(data): boolean {
    return data instanceof Object && typeof data !== 'function'
}

function isOkModel(model) {
    return isObject(model) && Object.keys(removeUndefKey(model)).length !== 0
}

function removeUndefKey(obj) {
    return Object.keys(obj).reduce((pre, k) => {
        if (obj[k] !== undefined) {
            pre[k] = obj[k]
        }
        return pre
    }, {})
}