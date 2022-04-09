import {
  Delete, Post, ReqBody, RouterController,
} from 'flash-wolves'

@RouterController('user')
export default class User {
  @Post('login', { key: 'value' })
  login(@ReqBody('username') username: string, @ReqBody('password') pwd: string) {
    console.log(username, pwd)
    return {
      username,
      pwd,
    }
  }

  @Delete('logout')
  logOut(@ReqBody('username') username: string, @ReqBody() body) {
    console.log(body, username)
    return body
  }
}
