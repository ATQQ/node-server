const rParams = /\/:(\w+)/g

const paths = ['user/info/:userId', 'user/:username/:userid', 'user/login']

const url = ['user/info', 'user/login', 'user/abcdef/12313', 'user/info/1212']

url.forEach(v => {

    let flag = true

    for (let path of paths) {
        let paramsArr = []
        path = path.replace(rParams, function (all, p1) {
            paramsArr.push(p1)
            return `/(\\w+)`
        })
        // console.log(paramsArr);
        // console.log(path);
        const r = new RegExp(path, 'ig')
        if (r.test(v)) {
            let params = {}
            v.replace(r, function (all) {
                params = paramsArr.reduce((pre, cuur, cuurIndex) => {
                    pre[cuur] = arguments[cuurIndex + 1]
                    return pre
                }, {})
                return all
            })

            console.log(v, paramsArr, params);
            flag = false
            break
        }
    }
    if (flag) {
        console.log(false, v);
    }
})

