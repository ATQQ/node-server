import { Router, iRouter, GetRoute } from "../../lib/router/decorators";

@Router('test2')
class Test2 extends iRouter {

    @GetRoute('get/:id', { name: 'xm' })
    hello1(req, res) {
        const { body, query, params } = req
        console.log(body, query, params);
        res.success()
    }
}

export default new Test2()