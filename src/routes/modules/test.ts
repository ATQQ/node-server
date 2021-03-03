import { UserPower } from '@/db/modal'
import { findUserData } from '@/db/testDb'
import Router from '@/lib/Router'

const router = new Router('test')

router.get('path1/path2', (req, res) => {
    console.log(`url参数: ${JSON.stringify(req.query)}`)
    findUserData()
    res.success()
})

router.post('path1/path2', (req, res) => {
    console.log(`url参数: ${JSON.stringify(req.query)}`)
    console.log(`body参数: ${JSON.stringify(req.data)}`)
    res.success()
}, { power: UserPower.admin })

router.delete('path1/path2', (req, res) => {
    console.log(`url参数: ${JSON.stringify(req.query)}`)
    console.log(`body参数: ${JSON.stringify(req.data)}`)
    res.fail(123, 'daada')
}, { power: UserPower.superAdmin })

router.put('path1/:path2', (req, res) => {
    console.log(`url参数: ${JSON.stringify(req.query)}`)
    console.log(`body参数: ${JSON.stringify(req.data)}`)
    console.log(`路由参数: ${JSON.stringify(req.pathValue)}`)
    res.success()
})
export default router