// types
import { SuperHttpRequest, SuperHttpResponse } from '@/lib/types'

// node module
import http from 'http'

// diy module 自建模块
import { serverConfig } from './config'

// middleware 中间件
import matchRequest from './lib/middleware/matchRequest'
import wrapperServer from './lib/middleware/wrapperServer'
import { expandHttpServerMethod } from './lib/middleware/wrapperServer'
import logReq from './lib/middleware/logReq'

expandHttpServerMethod(http)

const server = http.createServer(async (req: SuperHttpRequest, res: SuperHttpResponse) => {
    // 打印访问日志
    logReq(req)
    // 获取body数据，方法增强
    await wrapperServer(req, res)
    // 路由匹配
    matchRequest(req, res)
})

server.listen(serverConfig.port, serverConfig.hostname, () => {
    console.log(`server run success http://${serverConfig.hostname}:${serverConfig.port}`);
})