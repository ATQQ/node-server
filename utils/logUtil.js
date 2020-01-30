const { getUrlInfo } = require('./urlUtil')

// 打印访问日志
function logReq(req) {
    const { method, url } = req;
    let urlInfo = getUrlInfo(url)
    console.log(`${method} ${urlInfo.pathname}`);
}

module.exports = {
    logReq
}