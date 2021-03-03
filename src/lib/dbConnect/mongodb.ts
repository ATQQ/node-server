import { Db, MongoClient } from 'mongodb'
import { mongodbConfig } from '@/config'

const { host, port, user, password, database } = mongodbConfig

const url = `mongodb://${user}:${password}@${host}:${port}/${database}`

interface Res {
    db: MongoClient
    Db: Db
}

export function getDBConnection(): Promise<Res> {
    return new Promise((res, rej) => {
        MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }).then(db => {
            res({
                db,
                Db: db.db(database)
            })
        }).catch(err => {
            rej(err)
        })
    })
}
