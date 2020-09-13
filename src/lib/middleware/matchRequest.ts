import { matchRouter } from '@/router'
import { SuperHttpRequest, SuperHttpResponse } from '@/lib/types'

export default function(req: SuperHttpRequest, res: SuperHttpResponse):void {
    const route = matchRouter(req)
    if (route) {
        const { callback } = route
        callback(req, res)
        return
    }
    res.notFound()
}