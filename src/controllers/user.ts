import {
  Delete, Post, ReqBody, RouterController,
} from 'flash-wolves'

@RouterController('user')
export default class User {
  @Post('login')
  login(@ReqBody('username') username: string, @ReqBody('password') pwd: string) {
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
