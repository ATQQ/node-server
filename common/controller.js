const fs = require('fs')
const path = require('path')

// controller 目录
let controllerDir = path.resolve('controller')

// 获取目录中所有的controller
let files = fs.readdirSync(controllerDir, { withFileTypes: true })

const routes = {}

// 自动扫描导入所有的controller中的路径与执行方法
files.forEach(file => {
    if (file.isFile) {
        let res = require(`${controllerDir}/${file.name}`)
        console.log(`load ${path.basename(file.name,'.js')}`);
        for (const key in res) {
            if (res.hasOwnProperty(key)) {
                routes[key] = res[key];
                console.log(`load ${key}`);
            }
        }
    }
})

module.exports = routes