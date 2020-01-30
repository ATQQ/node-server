const { insertUser, selectUser, selectUserByUsername, updateUserPassword, deleteUserByPrimaryKey } = require('./../db/userDb')

// 本地存储
const localStorage = require('./../utils/storageUtil')

// token生成工具
const tokenUtil = require('../utils/tokenUtil')

/**
 * 注册用户
 */
async function register(req, res) {
    let data = JSON.parse(req.body)
    const { username, password, mobile, code } = data;

    // 如果使用了验证码 先验证code
    // ....code ....

    // 根据当前账号查询判断用户是否已经存在
    const users = await selectUserByUsername(username);
    if (users.length !== 0) {
        res.fail('username already exist', 10001)
        return
    }

    // 不存在则插入该用户
    let result = await insertUser(username, password)

    // 受影响行数为1 则 说明插入成功
    if (result.affectedRows === 1) {
        res.success()
        return
    }
    // 否则失败
    res.fail('error msg', 400)
}

/**
 * 获取用户的信息
 */
async function getUserInfo(req, res) {
    let data = req.body
    let { username } = data
    if (!username) {
        res.fail('username is null', 400)
        return;
    }
    const users = await selectUserByUsername(username);
    if (users.length === 1) {
        res.success(users[0])
        return
    }
    res.fail('username is not exist', 10001)
}

/**
 * 用户登录
 */
async function loginUser(req, res) {
    let data = JSON.parse(req.body);
    let { username, password } = data;
    const users = await selectUserByUsername(username);

    // 用户不存在
    if (users.length === 0) {
        res.fail('username is not exist', 10003)
        return;
    }
    const user = users[0]

    // 密码错误
    if (password !== user.password) {
        res.fail('password is error', 10002);
        return;
    }

    // 生成令牌
    let token = tokenUtil.createToken(user)

    // 存入本地缓存
    localStorage.setItem(token, user)

    res.success({ token });
}

/**
 * 更新用户密码
 */
async function updatePWD(req, res) {
    let data = JSON.parse(req.body)

    let { username, password, code } = data

    // 先校验验证码 code
    //  .... .code...
    let t = await updateUserPassword(username, password)
    console.log(t);
    res.success()
}

/**
 * 注销用户
 */
async function deleteUser(req, res) {
    let data = JSON.parse(req.body)
    const { username } = data

    // 一系列逻辑验证xxxx
    // ...code...

    // 查询取得id 
    const users = await selectUserByUsername(username)

    // 删除
    await deleteUserByPrimaryKey(users[0].id)

    res.success()
}
module.exports = {
    'POST /api/user/register': register,
    'GET /api/user/userinfo': getUserInfo,
    'POST /api/user/login': loginUser,
    'PUT /api/user/password': updatePWD,
    'DELETE /api/user/delete': deleteUser
}