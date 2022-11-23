const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogTester = require('./test_helper')
const Blog  = require('../models/blog')

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
    blogObject = new Blog(blogTester.initialBlogs[5])
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
    console.log('****',response.body.length)
    expect(response.body).toHaveLength(blogTester.initialBlogs.length)
})





afterAll(() => {
    mongoose.connection.close()
})