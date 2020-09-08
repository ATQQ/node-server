// types
import { SuperHttpRequest, SuperHttpResponse } from '@/lib/types'

// other module
import qs from 'query-string'
import url from 'url'

/**
 * 回调模板
 */
class Result {
    private code: number
    private data: Object
    private msg: string
    constructor(code: number, errMsg: string, data?: Object) {
        this.code = code;
        this.data = data;
        this.msg = errMsg;
    }
}

enum ContentType {
    formData = 'application/x-www-form-urlencoded',
    jsonData = 'application/json'
}
/**
 * 获取request请求携带的data数据 (用于非GET请求)
 * @param {HttpRequest} req 
 */
function getBodyContent(req: SuperHttpRequest) {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0)

        req.on('data', chunk => {
            buffer = Buffer.concat([buffer, chunk])
        })

        req.on('end', () => {
            const contentType = req.headers['content-type']
            let data = {}
            try {
                if (contentType.includes(ContentType.formData)) {
                    data = qs.parse(buffer.toString())
                }

                if (contentType.includes(ContentType.jsonData)) {
                    data = JSON.parse(buffer.toString())
                }

            } catch (error) {
                console.log(buffer.toString());
                console.error(error);
                data = {}
            } finally {
                resolve(data)
            }
        })
    })
}

export default async function wrapperServer(req: SuperHttpRequest, res: SuperHttpResponse) {

    res.setHeader('Content-Type', 'application/json;charset=utf-8')

    res.notFound = function () {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end('<h1>url not found</h1>')
    }

    res.json = function (data) {
        res.end(JSON.stringify(data))
    }

    res.success = function (data?) {
        res.json(new Result(0, 'ok', data))
    }

    res.fail = function (code: number, msg: string, data?: Object) {
        res.json(new Result(code, msg, data))
    }
    const { query } = url.parse(req.url)
    req.data = req.method === 'GET' ? qs.parse(query) : await getBodyContent(req)
}