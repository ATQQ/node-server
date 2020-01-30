const { query } = require('./coon')

/**
 * 插入用户
 * @param {String} username 用户名
 * @param {String} password 密码
 * @param {String} mobile 手机号(可选)
 */
async function insertUser(username, password, mobile) {
    let sql = 'insert into user(username,password) values(?,?)'
    if (mobile) {
        sql = 'insert into user(username,password,mobile) values(?,?,?)'
    }
    return await query(sql, username, password, mobile)
}

/**
 * 查询用户 通过用户名与密码
 * @param {String} username 用户名
 * @param {String} password 密码
 */
async function selectUser(username, password) {
    let sql = 'select * from user where username = ? and password = ?';
    return await query(sql, username, password)
}

/**
 * 查询用户 通过用户名
 * @param {String} username 用户名 
 */
async function selectUserByUsername(username) {
    let sql = 'select * from user where username = ?'
    return await query(sql, username)
}

/**
 * 修改用户密码 通过用户名
 * @param {String} username 用户名
 * @param {String} password 密码
 */
async function updateUserPassword(username, password) {
    let sql = 'update user set password = ? where username = ?'
    return await query(sql, password, username)
}

/**
 * 删除用户 通过用户主键
 * @param {Number} id 用户主键id 
 */
async function deleteUserByPrimaryKey(id) {
    let sql = 'delete from user where id = ?'
    return await query(sql, id)
}

module.exports = {
    insertUser,
    selectUser,
    selectUserByUsername,
    updateUserPassword,
    deleteUserByPrimaryKey
}