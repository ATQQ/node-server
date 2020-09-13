import { SuperHttpRequest } from '@/lib/types'
import nodeUrl from 'url'

/**
 * 打印访问日志
 * @param req 
 */
export default function (req: SuperHttpRequest): void {
    const { method, url } = req
    const urlInfo = nodeUrl.parse(url)
    console.log(`${method} ${urlInfo.pathname}`)
}