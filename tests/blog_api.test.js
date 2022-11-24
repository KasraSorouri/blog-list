const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogTester = require('./test_helper')
const Blog  = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
//    console.log('cleared');
/*
    let blogObject = new Blog(blogTester.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(blogTester.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(blogTester.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(blogTester.initialBlogs[3])
    await blogObject.save()
    blogObject = new Blog(blogTester.initialBlogs[4])
    await blogObject.save()

*/
    const blogObjects = blogTester.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

//    console.log('inisialization done!');
},)
describe('receive blogs', () => {
    test('blogs are returend as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('content-type', /application\/json/)
    })
     
    test('there are five blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogTester.initialBlogs.length)
    })
    
    test('id is unique identifier', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToCheck = blogs.body[0]
    //    console.log('ckeck -> ',blogs.body);
        expect(blogToCheck.id).toBeDefined()
    })

})


describe('post new item', () => {
    test('new item add to database' , async () => {
        const initialBlogs = await api.get('/api/blogs')

        const blogObject = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .send(blogObject)

        const blogs = await api.get('/api/blogs')
        expect(blogs.body.length).toBe(initialBlogs.body.length+1)
        
        const urls = blogs.body.map(blog => blog.url)
        expect(urls).toContain('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    })

    test('default value for like is zero', async () => {
        const blogObject = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
        }

        const response = await api
            .post('/api/blogs')
            .send(blogObject)
            const blog = await Blog.findOne({url:'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'})
            expect(blog.likes).toBe(0)
    })
})

describe('malformed data is not added', () => {
    test('blog without title is not added', async () => {
        const initialBlogs = await api.get('/api/blogs')

        const blogObject = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(400)
        
        const blogs = await api.get('/api/blogs')
        expect(blogs.body.length).toBe(initialBlogs.body.length)
    })
    test('blog without url is not added', async () => {
        const initialBlogs = await api.get('/api/blogs')

        const blogObject = {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(400)
        
        const blogs = await api.get('/api/blogs')
        expect(blogs.body.length).toBe(initialBlogs.body.length)
    })
})

describe('change specific blog', () => {
    test('delete a blogf', async () => {
        const initialBlogs = await api.get('/api/blogs')
        const id = initialBlogs.body[0].id

        await api.delete(`/api/blogs/:${id}`)
            .expect(204)
        
        const afterDelete = await api.get('/api/blogs')
        console.log('befoe delete:', initialBlogs.body.length, '    after delete:', afterDelete.body.length);
        expect(afterDelete.body.length).toBe(initialBlogs.body.length-1)
    })
})
afterAll(() => {
    mongoose.connection.close()
})