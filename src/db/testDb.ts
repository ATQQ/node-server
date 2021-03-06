import { query } from '@/lib/dbConnect/mongodb'
import { getClient } from '@/lib/dbConnect/redis'

export function findUserData() {
    return query((db, resolve) => {
        db.collection('user').find().toArray().then(data => {
            resolve(data)
        })
    })
}

export function setRedisKey(): void {
    getClient().then(client => {
        client.set('test', '1000')
        client.get('test', (err, res) => {
            console.log(res)
        })
        client.expire('test', 20)
    })
}