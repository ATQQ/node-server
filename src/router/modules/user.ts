import Router from '../../lib/Router'

// db
import { selectUserByUsername } from './../../db/userDb'

const userRouter = new Router('user')

interface LoginData {
    username: string
    password: string
}

userRouter.post<LoginData>('login', async (req, res) => {
    console.log(req.data);
    const { username, password } = req.data
    const user = await selectUserByUsername(username)
    res.success(user[0])
})

userRouter.get('getCode', async (req, res) => {
    console.log(req.data);
    res.success()
})

userRouter.post('info/:userId', async (req, res) => {
    console.log(req.params);
    console.log(req.data);
    res.success()
})

export default userRouter