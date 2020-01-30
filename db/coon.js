const mysql = require('mysql')
const dbconfig = require('./../config/db.config')

// 创建连接池
const pool = mysql.createPool(dbconfig)

/**
 * 执行sql语句
 * @param {String} sql sql语句 
 * @param {...String} params 参数 
 */
function query(sql, ...params) {
    return new Promise((resolve, reject) => {
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

module.exports = { query }