const http = require('http')

// url处理
const { getUrlInfo, getBodyContent, getUrlParams } = require('./utils/urlUtil')

// 打印访问日志
const { logReq } = require('./utils/logUtil')

// 拓展response
const　 { response } = require('./common/responseExpand')

// 加载routes
const routes = require('./common/controller')

const router = {...routes }

let server = http.createServer(async(req, res) => {

    // 调用访问日志打印
    logReq(req)

    // 拓展response
    res = response(res);

    //  -------跨域支持-----------
    // 放行指定域名
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')

    // 放行所有
    // res.setHeader('Access-Control-Allow-Origin', '*')

    // 获取请求的方法与全路径
    let { method, url } = req;

    // 解析url中的信息
    let urlInfo = getUrlInfo(url)

    // 获取请求的路径(/api/xxxx)
    let { pathname } = urlInfo

    // 获取传输的data数据绑定到request的body上
    let data = method === 'GET' ? getUrlParams(url) : await getBodyContent(req)
    req['body'] = data

    // 获取对应的执行方法
    let fn = router[`${method} ${pathname}`]
    if (fn) {
        fn(req, res)
    } else {
        res.writeHead(404, {
            'content-type': 'text/html;charset=utf-8'
        })
        res.end('<h1>404 not find</h1>')
    }
})

// 监听端口号
const port = 3000

// host地址
const hostname = 'localhost'


// 启动
server.listen(port, hostname, err => {
    console.log(`listen ${port} success`);
})