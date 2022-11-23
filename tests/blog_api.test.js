const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogTester = require('./test_helper')
const Blog  = require('../models/blog')
const { response } = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared');

    
    console.log('** blogs **', blogTester.initialBlogs.length);

    let blogObject = new Blog(blogTester.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(blogTester.initialBlogs[1])
    await blogObject.save()

   // let blogs = await api.get('/api/blogs')
   // console.log('>>>> partial blog' , blogs.body.length);

    blogObject = new Blog(blogTester.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(blogTester.initialBlogs[3])
    await blogObject.save()

  //  blogs = await api.get('/api/blogs')
  //  console.log('>>>> partial blog' , blogs.body.length);

    blogObject = new Blog(blogTester.initialBlogs[4])
    await blogObject.save()

/*   
    blogTester.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('blogs saved');
    },100000)
*/
    blogs = await api.get('/api/blogs')
    console.log('>>>> ****** blog' , blogs.body.length);

    console.log('inisialization done!');
})

test('blogs are returend as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('content-type', /application\/json/)
})
 
test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogTester.initialBlogs.length)
})

test('id is unique identifier', async () => {
    const blogs = await Blog.find()
    const blogToCheck = blogs[0]
//    console.log('ckeck -> ',blogToCheck.id);
    expect(blogToCheck.id).toBeDefined()
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
})

describe('default Value', () => {
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



afterAll(() => {
    mongoose.connection.close()
})