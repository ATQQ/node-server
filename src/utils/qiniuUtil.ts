import { qiniuConfig } from '@/config'
import qiniu from 'qiniu'
// [node-sdk文档地址](https://developer.qiniu.com/kodo/1289/nodejs#server-upload)
const privateBucketDomain = 'https://example.com'
const getDeadline = () => {
    // 12小时过期
    return Math.floor(Date.now() / 1000) + 3600 * 12
}
const bucket = 'bucketName'
const mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey)
const { urlsafeBase64Encode } = qiniu.util

/**
 * 获取OSS上文件的下载链接（默认12h有效）
 * @param key 文件的key
 * @param expiredTime 
 */
export function createDownloadUrl(key: string, expiredTime = getDeadline()): string {
    // 七牛云相关
    const config = new qiniu.conf.Config()
    // 鉴权的内容，请求的时候生成，避免过期
    const bucketManager = new qiniu.rs.BucketManager(mac, config)

    return bucketManager.privateDownloadUrl(privateBucketDomain, key, expiredTime)
}

export function getUploadToken(): string {
    const putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket,
    })
    return putPolicy.uploadToken(mac)
}

export function deleteFiles(prefix: string): void {
    const config = new qiniu.conf.Config()
    const bucketManager = new qiniu.rs.BucketManager(mac, config)
    bucketManager.listPrefix(bucket, {
        // TODO:暂时这样写，后面改进
        limit: 1000,
        prefix
    }, (err, respBody) => {
        const files: any[] = respBody.items
        files.forEach(file => {
            deleteObjByKey(file.key)
        })
    })
}

export function deleteObjByKey(key: string): void {
    const config = new qiniu.conf.Config()
    const bucketManager = new qiniu.rs.BucketManager(mac, config)
    bucketManager.delete(bucket, key, err => {
        if (err) {
            console.log('------删除失败 start-------')
            console.log(key)
            console.log(err)
            console.log('------删除失败 end-------')
        }
    })
}

export function judgeFileIsExist(key: string): Promise<boolean> {
    return new Promise(res => {
        const config = new qiniu.conf.Config()
        const bucketManager = new qiniu.rs.BucketManager(mac, config)
        bucketManager.stat(bucket, key, (err, respBody, respInfo) => {
            res(respInfo.statusCode !== 612)
        })
    })
}

export function getFileCount(prefix: string): Promise<number> {
    return new Promise(res => {
        const config = new qiniu.conf.Config()
        const bucketManager = new qiniu.rs.BucketManager(mac, config)
        bucketManager.listPrefix(bucket, {
            limit: 10,
            prefix
        }, (err, respBody) => {
            res(respBody?.items?.length || 0)
        })
    })
}

export function makeZip(prefix: string, zipName: string, keys: string[] = []): Promise<string> {
    return new Promise(res => {
        const config = new qiniu.conf.Config()
        const bucketManager = new qiniu.rs.BucketManager(mac, config)

        bucketManager.listPrefix(bucket, {
            // TODO:暂时这样写，后面改进
            limit: 1000,
            prefix
        }, (err, respBody) => {
            const files: any[] = respBody.items
            // 删除旧的压缩文件
            deleteFiles(prefix.slice(0, -1) + '_package/')

            // 上传内容,过滤掉数据库中不存在的
            const content = files.filter(file => keys.includes(file.key)).map(file => {
                // 拼接原始url
                // 链接加密并进行Base64编码，别名去除前缀目录。
                const safeUrl = `/url/${urlsafeBase64Encode(createDownloadUrl(file.key))}/alias/${urlsafeBase64Encode(file.key.substr(prefix.length))}`
                return safeUrl
            }).join('\n')
            const config = new qiniu.conf.Config({ zone: qiniu.zone.Zone_z2 })
            const formUploader = new qiniu.form_up.FormUploader(config)
            const putExtra = new qiniu.form_up.PutExtra()
            const key = `${Date.now()}-${~~(Math.random() * 1000)}.txt`

            formUploader.put(getUploadToken(), key, content, putExtra, function (respErr,
                respBody, respInfo) {
                if (respErr) {
                    throw respErr
                }
                if (respInfo.statusCode == 200) {
                    const { key } = respBody
                    // 执行压缩
                    const zipKey = urlsafeBase64Encode(bucket + ':' + prefix.substring(0, prefix.length - 1) + '_package/' + zipName + '.zip')

                    const fops = `mkzip/4/encoding/${urlsafeBase64Encode('gbk')}|saveas/${zipKey}`
                    const operManager = new qiniu.fop.OperationManager(mac, config)
                    const pipeline = '' // 使用公共队列
                    // 下行。不知用处
                    const options = { force: false }
                    operManager.pfop(bucket, key, [fops], pipeline, options, (err, respBody, respInfo) => {
                        if (err) {
                            throw err
                        }
                        if (respInfo.statusCode == 200) {
                            // 可直接通过statusUrl查询处理状态
                            const statusUrl = `http://api.qiniu.com/status/get/prefop?id=${respBody.persistentId}`
                            console.log(statusUrl)
                            // 这里只返回任务id，转由客户端发请求查询
                            res(respBody.persistentId)
                        } else {
                            console.log(respInfo.statusCode)
                            console.log(respBody)
                        }
                    })
                } else {
                    console.log(respInfo.statusCode)
                    console.log(respBody)
                }
            })
        })
    })
}

export function checkFopTaskStatus(persistentId: string): Promise<{ code: number, key?: string }> {
    const config = new qiniu.conf.Config()
    const operManager = new qiniu.fop.OperationManager(null, config)
    return new Promise((res) => {
        operManager.prefop(persistentId, function (err, respBody, respInfo) {
            if (err) {
                console.log(err)
                throw err
            }
            if (respInfo.statusCode == 200) {
                // 结构 ![图片](http://img.cdn.sugarat.top/mdImg/MTYxMjg0MTQyODQ1Mg==612841428452)
                const item = respBody.items[0]
                const { code, key } = item
                res({ code, key })
            } else {
                console.log(respInfo.statusCode)
                console.log(respBody)
            }
        })
    })
}