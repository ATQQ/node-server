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

type Callback<T> = (db: Db, resolve: (value: T | PromiseLike<T>) => void) => void

export function query<T>(callback: Callback<T>): Promise<T> {
    const p = new Promise<T>((resolve, rej) => {
        getDBConnection().then(({ db, Db }) => {
            // 执行回调
            callback(Db, resolve)
            // resolve后关闭
            p.catch((e) => rej(e))
                .finally(() => {
                    db.close()
                })
        })
    })
    return p
}