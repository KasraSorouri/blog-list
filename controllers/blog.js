const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('barear ')) {
    return authorization.substring(7)
  }
  return null
}
*/

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username','name'])
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {

  const body = request.body
  const decodeToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodeToken.id) {
    return response.status(401).json({ error : 'token missing or invalid'})
  }
  const user = await User.findById(decodeToken.id)

  const blogObject = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
    
  const blog = await blogObject.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET)
  const userid = decodeToken.id
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'the blog can be deleted onlo by its creator'})
  }

})

blogRouter.put('/:id', async (request, response) => {
  const likes = request.query.likes
  const id = request.params.id
  console.log('id', id);
  console.log('request>', likes)
  
  updateBlog = await Blog.findByIdAndUpdate(id , { likes: likes },{new : true})
  console.log('updateblog ->', updateBlog);
  response.status(200).json(updateBlog)
})

module.exports = blogRouter