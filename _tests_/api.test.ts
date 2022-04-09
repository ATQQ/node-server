import { expect, test } from 'vitest'
import http from './axios'

test('user/login', async () => {
  const { data } = await http.post('user/login', { username: 'abc', password: '123456' })
  expect(data).toEqual({ name: 'abc', pwd: '123456' })
})

test('user/logout', async () => {
  const { data } = await http.delete('user/logout', { data: { username: 'test' } })
  expect(data).toEqual({ username: 'test' })
})

test('user/info/:id', async () => {
  const { data } = await http.get('user/info/123', { params: { id: '456' } })
  expect(data).toEqual({ id: '123', query: { id: '456' }, params: { id: '123' } })
})
