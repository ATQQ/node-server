interface Value {
    value: any
    duration: number
}

/**
 * 自行构建的本地存储对象
 */
class LocalStorage {
    private map: Map<string, Value>

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
     * @param key 键
     * @param value 值
     * @param duration(s) 过期时间(默认-1不过期)
     */
    setItem(key: string, value: any, duration = -1) {
        this.map.set(key, { value, duration })
    }

    /**
     * 移除键
     */
    removeItem(key: string) {
        this.map.delete(key)
    }

    /**
     * 过期指定键
     */
    expireItem(key: string) {
        this.setItem(key, null, 0)
    }

    /**
     * 获取键值
     */
    getItem(key: string) {
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
        for (const key of keys) {
            let value = this.getItem(key)
            if (value.duration === 0) {
                // 处理过期
                console.log(`处理过期-------${key}`);
                this.removeItem(key)
            } else {
                let { value: v, duration } = value;
                this.setItem(key, v, --duration)
            }
        }
    }

    static instance = null
    /**
     * 获取对象
     */
    static getInstance() {
        if (!LocalStorage.instance) {
            LocalStorage.instance = new LocalStorage()
        }
        return LocalStorage.instance
    }
}

export default LocalStorage.getInstance()