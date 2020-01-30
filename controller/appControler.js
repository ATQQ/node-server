// 随机数工具
const { randomNumStr } = require('./../utils/randUtil')

// 正则
const { mobilePhone } = require('./../common/regExp')

// 本地存储
const localStorage = require('./../utils/storageUtil')

/**
 * 获取验证码
 */
async function getCode(req, res) {
    let data = req.body;
    const { mobile } = data;
    if (mobile && mobilePhone.test(mobile)) {
        let code = randomNumStr(4);
        let key = `${mobile}----${code}`;
        console.log(key);
        // 90s 有效期
        localStorage.setItem(key, code, 90)
        res.success()
    } else {
        res.fail('mobile phone is error', 10004)
    }
}

module.exports = {
    'GET /api/app/getcode': getCode
}