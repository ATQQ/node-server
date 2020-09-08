import { Route } from "@/lib/types"
import userRouter from './modules/user'
import { SuperHttpRequest } from '@/lib/types'

export const routes: Route[] = [userRouter].reduce((pre, cuur) => {
    return pre.concat(cuur.getRoute())
}, [])

export function matchReqPath(path: string, reqPath: string) {
    const rParams = /\/:(\w+)/g
    // url参数组
    let paramsArr: string[] = []
    path = path.replace(rParams, function (all, p1) {
        paramsArr.push(p1)
        return `/(\\w+)`
    })
    let params = {}
    let ok = false

    const r = new RegExp(path, 'ig')

    if (r.test(reqPath)) {
        reqPath.replace(r, function (all) {
            params = paramsArr.reduce((pre, cuur, cuurIndex) => {
                pre[cuur] = arguments[cuurIndex + 1]
                return pre
            }, {})
            return all
        })
        ok = true
    }
    return {
        params,
        ok
    }
}

export function matchRouter(req: SuperHttpRequest) {
    const { method: reqMethod, url: reqPath } = req
    const route = routes.find(route => {
        const { path, method } = route
        // 方法不匹配
        if (reqMethod.toLowerCase() !== method) {
            return false
        }

        const { params, ok } = matchReqPath(path, reqPath)
        if (ok) {
            req.params = params
        }
        return ok
    })
    return route
}