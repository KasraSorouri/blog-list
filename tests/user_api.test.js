const mongoose = require('mongoose')
const supertest = require('supertest')
const { request, response } = require('../app')
const app = require('../app')
const user = require('../models/user')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await user.deleteMany({})
})

describe('malformed user is not added', () => {
    test('short username is not added', async () => {
        const initialUser = await testHelper.userInDb()
        const user = {
            username: 'aa',
            password: '1230',
            name: 'user'
        }
        const response = await api
                           .post('/api/users')
                           .send(user)
        expect(400)
        expect(response.body.error).toContain('is shorter than the minimum allowed length (3)')
        
        const userAtEnd = await testHelper.userInDb()
        expect(userAtEnd.length).toBe(initialUser.length)

    //    console.log('res ->',response.body.error)
    })
    test('short password is not added', async () => {
        const initialUser = await testHelper.userInDb()
        const user = {
            username: 'username',
            password: '12',
            name: 'user'
        }
        const response = await api
                           .post('/api/users')
                           .send(user)
        expect(400)
        expect(response.body.error).toContain('password must have at least 3 character length')

        const userAtEnd = await testHelper.userInDb()
        expect(userAtEnd.length).toBe(initialUser.length)
    //    console.log('res ->',response.body.error);
    })
    test('dublicated username is not added', async () => {
        const user1 = {
            username: 'username',
            password: '12300',
            name: 'user1'
        }
        await api
            .post('/api/users')
            .send(user1)
        const BeforeAddUser = await testHelper.userInDb()
   //     console.log('init ->', BeforeAddUser);
        const user2 = {
            username: 'username',
            password: '12300',
            name: 'user2'
        }
        const response = await api
                           .post('/api/users')
                           .send(user2)
        expect(400)
        expect(response.body.error).toContain('this username is taken before')

        const userAtEnd = await testHelper.userInDb()
        expect(userAtEnd.length).toBe(BeforeAddUser.length)
    //    console.log('res ->',response.body.error);
    })


})