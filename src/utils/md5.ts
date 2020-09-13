import crypto from 'crypto'

/**
 * 加密字符串
 * @param str 待加密的字符串
 */
export function encryption(str: string): string {
    return crypto.createHash('md5').update(str).digest('hex')
}
