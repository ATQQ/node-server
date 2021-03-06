import { selectTableByData } from '../src/utils/sqlUtil'

test('selectTableByData("user")', () => {
    const { sql, params } = selectTableByData('user')
    expect(sql).toBe('select * from user')
    expect(params).toEqual([])
})

test('selectTableByData("user",{})', () => {
    const { sql, params } = selectTableByData('user', {})
    expect(sql).toBe('select * from user')
    expect(params).toEqual([])
})

test('selectTableByData("user",{name:"xm"})', () => {
    const { sql, params } = selectTableByData('user', { data: { name: 'xm' } })
    expect(sql).toBe('select * from user where name = ?')
    expect(params).toEqual(['xm'])
})

test('selectTableByData("user",{name:"xm"},["id","birthday"])', () => {
    const { sql, params } = selectTableByData('user', {
        data: { name: 'xm' },
        columns: ['id', 'birthday']
    })
    expect(sql).toBe('select id,birthday from user where name = ?')
    expect(params).toEqual(['xm'])
})

test('selectTableByData("user",{name:"xm",id:1})', () => {
    const { sql, params } = selectTableByData('user', {
        data: { name: 'xm', id: 1 }
    })
    expect(sql).toBe('select * from user where name = ? and id = ?')
    expect(params).toEqual(['xm', 1])
})

test('selectTableByData("user",{},[])', () => {
    const { sql, params } = selectTableByData('user', {
        data: {},
        columns: []
    })
    expect(sql).toBe('select * from user')
    expect(params).toEqual([])
})

test('selectTableByData("user",{},["id", "name"])', () => {
    const { sql, params } = selectTableByData('user', {
        data: {},
        columns: ['id', 'name']
    })
    expect(sql).toBe('select id,name from user')
    expect(params).toEqual([])
})

test('selectTableByData("user",{pwd:"123456",taskName:"task1"},["id", "name"])', () => {
    const { sql, params } = selectTableByData('user', {
        data: { pwd: '123456', taskName: 'task1' },
        columns: ['id', 'name']
    })
    expect(sql).toBe('select id,name from user where pwd = ? and task_name = ?')
    expect(params).toEqual(['123456', 'task1'])
})
