import { IncomingMessage, ServerResponse } from 'http'

interface Params {
    [key: string]: string
}

export interface SuperHttpRequest extends IncomingMessage {
    params?: Params
    data: Object
}

export interface SuperHttpResponse extends ServerResponse {
    json?: Function
    notFound?: Function
    success?: Function
    fail?: Function
}

export type callback = (req: SuperHttpRequest, res: SuperHttpResponse) => void

export interface Route {
    method: string
    path: string
    callback: callback
}