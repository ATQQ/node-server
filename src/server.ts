// 编译后的绝对路径映射插件
import 'module-alias/register'

// types
import { SuperHttpRequest, SuperHttpResponse } from '@/lib/types'

// node module
import http from 'http'

// diy module 自建模块
import { serverConfig } from './config'

// middleware 中间件
import matchRequest from '@middleware/matchRequest'
import wrapperServer from '@middleware/wrapperServer'
import { expandHttpServerMethod } from '@middleware/wrapperServer'
import logReq from '@middleware/logReq'

// 在原型上(prototype)对request与response进行拓展
expandHttpServerMethod(http)

const server = http.createServer(async (req: SuperHttpRequest, res: SuperHttpResponse) => {
    global['res'] = res
    // 打印访问日志
    logReq(req)
    // 获取body数据，方法增强
    await wrapperServer(req, res)
    // 路由匹配
    matchRequest(req, res)
})

server.listen(serverConfig.port, serverConfig.hostname, () => {
    console.log(`server run success http://${serverConfig.hostname}:${serverConfig.port}`)
})