// types
import { SuperHttpRequest, SuperHttpResponse } from '@/types'

// node module
import http from 'http'

// diy module
import { routes } from './router'
import { serverConfig } from './config'

// middleware
import initServer from './middleware/initServer'
import wrapperServer from './middleware/wrapperServer'

const server = http.createServer(async (req: SuperHttpRequest, res: SuperHttpResponse) => {
    // 方法增强
    await wrapperServer(req, res)
    initServer(req, res)
})

server.listen(serverConfig.port, serverConfig.hostname, () => {
    console.log('success');
    console.log(routes);
})