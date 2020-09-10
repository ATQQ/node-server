import storage from '../src/utils/storageUtil'

storage.setItem('abc', { name: 123 }, 2)

setTimeout(() => {
    storage.setItem('kdb', { name: 123 }, 4)
}, 1500)


storage.removeItem('abc')