const userDb = require('../db/userDb')

let fun = (async() => {
    let res = ''

    // 插入示例1
    res = await userDb.insertUser('admin1', 'password1')
    console.log(res);

    // 插入示例2
    res = await userDb.insertUser('admin2', 'password2', '01234567891')
    console.log(res);

    // 查询示例1
    res = await userDb.selectUser('admin1', 'password1')
    console.log(res);

    // 查询示例2
    res = await userDb.selectUserByUsername('admin1')
    console.log(res);

    // 更新示例1
    res = await userDb.updateUserPassword('admin1', 'a123123')
    console.log(res);

    // 删除示例1
    res = await userDb.deleteUserByPrimaryKey(7)
    console.log(res);

})

fun()