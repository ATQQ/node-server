import { getDBConnection } from '@/lib/dbConnect/mongodb'

export function findUserData(): void {
    getDBConnection().then(({ db, Db }) => {
        Db.collection('user').find().toArray().then(data => {
            console.log(data)
            db.close()
        })
    })
}