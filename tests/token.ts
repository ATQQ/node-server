import tokenUtil from './../src/utils/tokenUtil'

let token: string = tokenUtil.createToken({
    account: 'abcdefg',
    password: 'dada',
    id: 313
})

console.log(token);

console.log(tokenUtil.getUserInfo(token));
setTimeout(() => {
    tokenUtil.expiredToken(token)
}, 2000)



