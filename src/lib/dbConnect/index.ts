import mysql from 'mysql'
import { dbConfig } from './../../config'

// 创建连接池
const pool = mysql.createPool(dbConfig)

type param = string | number
/**
 * 执行sql语句
 * @param sql sql语句 
 * @param params 参数 
 */
export function query<T>(sql: string, ...params: param[]) {
    return new Promise<T>((resolve, reject) => {
        pool.getConnection((err, coon) => {
            if (err) {
                reject(err)
                return;
            }

            coon.query(sql, params, (err, result, fields) => {
                coon.release()
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result)
            })
        })
    })
}
