// types
import { SuperHttpRequest, SuperHttpResponse } from '@/lib/types'

// node module
import http from 'http'

// diy module 自建模块
import { routes } from './router'
import { serverConfig } from './config'

// middleware 中间件
import initServer from './lib/middleware/initServer'
import wrapperServer from './lib/middleware/wrapperServer'
import logReq from './lib/middleware/logReq'

const server = http.createServer(async (req: SuperHttpRequest, res: SuperHttpResponse) => {
    // 打印访问日志
    logReq(req)
    // 获取body数据，方法增强
    await wrapperServer(req, res)
    initServer(req, res)
})

server.listen(serverConfig.port, serverConfig.hostname, () => {
    console.log('server run success');
})