import { Middleware } from 'flash-wolves'

const interceptor: Middleware = (req, res) => {
  const { method } = req
  console.log(`afterRequest:${req.method} - ${req.url}`)
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 跨域允许的header类型
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
