const url = require('url')

// 解析获取完整的请求路径的信息
const getCompleteUrlInfo = (str) => url.parse(str, true)

/**
 * 获取通过url传递的参数(GET请求主要用于)
 */
function getUrlParams(str) {
    return getCompleteUrlInfo(str).query
}

/**
 * 解析获取完整的请求路径的信息
 */
function getUrlInfo(str) {
    return getCompleteUrlInfo(str)
}

/**
 * 获取request请求携带的data数据 (用于非GET请求)
 * @param {HttpRequest} req 
 */
function getBodyContent(req) {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0)

        req.on('data', chunk => {
            buffer = Buffer.concat([buffer, chunk])
        })

        req.on('end', () => {
            resolve(buffer)
        })
    })
}

module.exports = {
    getUrlParams,
    getUrlInfo,
    getBodyContent
}