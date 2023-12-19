import {
  Delete, Get, Post, ReqBody, ReqParams, ReqQuery, RouterController,
} from 'flash-wolves'

@RouterController('user')
export default class User {
  @Post('login', { key: 'value' })
  login(@ReqBody('username') name: string, @ReqBody('password') pwd: string) {
    console.log(name, pwd)
    return {
      name,
      pwd,
    }
  }

  @Delete('logout')
  logOut(@ReqBody('username') username: string, @ReqBody() body) {
    console.log(body, username)
    return body
  }

  @Get('info/:id')
  info(@ReqParams('id') id: string, @ReqParams() params, @ReqQuery() query) {
    console.log('id', id)
    console.log('param', params)
    console.log('query', query)
    return {
      id, query, params,
    }
  }
}
