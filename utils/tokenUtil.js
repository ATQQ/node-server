const { encryption } = require('../utils/md5')

/**
 * Token(身份令牌)工具类
 */
class TokenUtil {

    /**
     * 生成token
     * @param {User} user 用户对象信息 
     */
    createToken(user) {
        const { username } = user;
        return encryption([username, Date.now()].join())
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new TokenUtil()
        }
        return this.instance;
    }
}

module.exports = TokenUtil.getInstance()