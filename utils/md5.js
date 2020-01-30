const crypto = require('crypto')

// md5加密
const md5 = crypto.createHash('md5')

/**
 * 加密字符串
 * @param {String} str 待加密的字符串
 */
function encryption(str) {
    md5.update(str)
    return md5.digest('hex')
}

module.exports = {
    encryption
}