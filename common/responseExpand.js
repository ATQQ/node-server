// response拓展

/**
 * 回调模板
 */
class Result {
    constructor(code, data, errMsg) {
        this.code = code;
        this.data = data;
        this.errMsg = errMsg;
    }
}

/**
 * 包装response
 * @param { HttpResponse } res 
 */
function response(res) {
    // 自定义res.json方法
    res['json'] = ((res) => {
        // 设置回调的content-type格式
        res.setHeader('content-type', 'application/json;charset=utf-8')
        return (data) => {
            res.end(JSON.stringify(data))
        }
    })(res)

    // 自定义res.success方法
    res['success'] = ((res) => {
        // 设置回调的content-type格式
        res.setHeader('content-type', 'application/json;charset=utf-8')
        return (data, code = 0, errMsg = 'OK') => {
            res.end(JSON.stringify(new Result(code, data, errMsg)))
        }
    })(res)

    // 自定义res.fail方法
    res['fail'] = ((res) => {
        // 设置回调的content-type格式
        // res.writeHead(500, {
        //     'content-type': 'application/json;charset=utf-8'
        // })
        return (errMsg = 'server Error', code = 500) => {
            res.end(JSON.stringify(new Result(code, undefined, errMsg)))
        }
    })(res)

    return res
}

module.exports = { response }