/**
 * 自行构建的本地存储对象
 */
class LocalStorage {
    constructor() {
        this.map = new Map()

        const fun = () => {
            setTimeout(() => {
                this.expiredCheck()
                fun()
            }, 1000)
        }
        fun()
    }

    /**
     * 设置键
     * @param {any} key 键
     * @param {any} value 值
     * @param {Number} duration(s) 过期时间(默认-1不过期)
     */
    setItem(key, value, duration = -1) {
        this.map.set(key, { value, duration })
    }

    /**
     * 移除键
     * @param {any} key 键
     */
    removeItem(key) {
        this.map.set(key, null)
    }

    /**
     * 过期指定键
     * @param {any} key 键
     */
    expireItem(key) {
        this.setItem(key, null, 0)
    }

    /**
     * 获取键值
     * @param {any} key 键
     */
    getItem(key) {
        return this.map.get(key)
    }

    /**
     * 清除所有键值 
     */
    clearItem() {
        this.map.clear()
    }

    /**
     * 过期检测
     */
    expiredCheck() {
        let keys = this.map.keys()
            // console.log('---开始扫描---');
        for (const key of keys) {
            let value = this.getItem(key)
            if (value && value.duration && value.duration > 0) {
                let { value: v, duration } = value;
                this.setItem(key, v, --duration)
            } else if (value && value.duration === 0) {
                // 处理过期
                console.log(`处理过期-------${key}`);
                this.removeItem(key)
            }
            // if (value) {
            //     console.log(value.duration);
            // }

            // 负数不处理
        }
    }

    /**
     * 获取对象
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new LocalStorage()
        }
        return this.instance
    }
}

module.exports = LocalStorage.getInstance()