import { App } from 'flash-wolves'
import { serverConfig } from '@/config'
import controllers from '@/controllers'
import { routeInterceptor, serverInterceptor } from './middleware'

const app = new App({
  afterRequest: serverInterceptor,
  beforeRunRoute: routeInterceptor,
})

// 注册路由
app.addController(controllers)

// 启动服务
app.listen(serverConfig.port, serverConfig.hostname)
// or
// app.listen()

// 查看注册的路由
// console.log(app.routes)

// 导出实例，使用serverless部署时使用
// module.exports = app
