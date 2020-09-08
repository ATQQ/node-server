import { matchRouter } from './../router'
import { SuperHttpRequest, SuperHttpResponse } from '@/types'

export default function (req: SuperHttpRequest, res: SuperHttpResponse) {
    const route = matchRouter(req)
    if(route){
        const {callback} = route
        callback(req, res)
        return
    }
    res.notFound()
}