import { SuperHttpRequest, SuperHttpResponse } from '@/types'

export type callback = (req: SuperHttpRequest, res: SuperHttpResponse) => void

export interface Route {
    method: string
    path: string
    callback: callback
}