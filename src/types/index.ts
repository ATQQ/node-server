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