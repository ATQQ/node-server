// 开发环境
let devConfig = {
    host: 'localhost',
    port: '3306',
    user: 'sugar',
    password: 'a123456',
    database: 'node_server'
}

// 生产环境
let proConfig = {
    host: 'localhost',
    port: '3306',
    user: 'sugar',
    password: 'a123456',
    database: 'node_server'
}

// 默认使用开发环境
config = devConfig

// 判断环境
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    config = proConfig
}

module.exports = config