// types
import { Route } from 'flash-wolves'

// router
import test from './modules/test'
import test2 from './modules/test2'


// 这里注册路由
const routers = [test,test2]

export default routers.reduce((pre: Route[], router) => {
    return pre.concat(router.getRoutes())
}, [])