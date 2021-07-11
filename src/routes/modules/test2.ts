import { FwController, RouterController,GetMapping } from 'flash-wolves'

@RouterController('test2')
class Test2 extends FwController {
    @GetMapping('get/:id', { name: 'xm' })
    hello1(req, res) {
        const { body, query, params } = req
        console.log(body, query, params)
        res.success()
    }
}

export default new Test2()