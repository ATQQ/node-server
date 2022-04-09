// 配置文件
import { App } from 'flash-wolves'
import { serverConfig } from '@/config'

// routes
import controllers from '@/controllers'

const app = new App()

// 注册路由
app.addController(controllers)

app.listen(serverConfig.port, serverConfig.hostname)
// or
// app.listen()

// 查看注册的路由
console.log(app.routes)

module.exports = app
