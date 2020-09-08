import Router from '../../lib/Router'

const userRouter = new Router('user')

userRouter.post('login', async (req, res) => {
    console.log(req.data);
    res.success()
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