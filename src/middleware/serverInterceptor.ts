import { Middleware } from '@/lib/server/types'
// 允许跨域访问的源
const allowOrigins = ['http://localhost:8088', 'https://ep2.sugarat.top', 'https://ep.sugarat.top']

const interceptor: Middleware = (req, res) => {
    const { method } = req
    console.log(`构造函数:${req.method} - ${req.url}`)

    if (allowOrigins.includes(req.headers.origin)) {
        // 允许跨域
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }
    //跨域允许的header类型
    res.setHeader('Access-Control-Allow-Headers', '*')
    // 允许跨域携带cookie
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // 允许的方法
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    // 设置响应头
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    // 对预检请求放行
    if (method === 'OPTIONS') {
        res.statusCode = 204
        res.end()
    }
}
export default interceptor