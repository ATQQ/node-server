import { Route, SuperHttpRequest, Params } from '@/lib/types'
import userRouter from './modules/user'
import nodeUrl from 'url'

export const routes: Route[] = [userRouter].reduce((pre, cuur) => {
    return pre.concat(cuur.getRoute())
}, [])
interface ReqPathParams {
    params: Params,
    ok: boolean
}
export function matchReqPath(path: string, reqPath: string): ReqPathParams {
    const rParams = /\/:(\w+)/g
    // url参数组
    const paramsArr: string[] = []
    path = path.replace(rParams, function (all, p1) {
        paramsArr.push(p1)
        return '/(\\w+)'
    })
    let params = {}
    let ok = false

    const r = new RegExp(`^\/${path}$`, 'ig')

    if (r.test(reqPath)) {
        reqPath.replace(r, function (...rest) {
            params = paramsArr.reduce((pre, cuur, cuurIndex) => {
                pre[cuur] = rest[cuurIndex + 1]
                return pre
            }, {})
            return rest[0]
        })
        ok = true
    }
    return {
        params,
        ok
    }
}

export function matchRouter(req: SuperHttpRequest): Route {
    const { method: reqMethod, url: reqPath } = req
    const route = routes.find(route => {
        const { path, method } = route
        // 方法不匹配
        if (reqMethod.toLowerCase() !== method) {
            return false
        }

        const { params, ok } = matchReqPath(path, nodeUrl.parse(reqPath).pathname)
        if (ok) {
            req.params = params
        }
        return ok
    })
    return route
}