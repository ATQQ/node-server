import { getDBConnection } from '@/lib/dbConnect/mongodb'
import { getClient } from '@/lib/dbConnect/redis'

export function findUserData(): void {
    getDBConnection().then(({ db, Db }) => {
        Db.collection('user').find().toArray().then(data => {
            console.log(data)
            db.close()
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