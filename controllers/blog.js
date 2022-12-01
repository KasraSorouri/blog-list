const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username','name'])
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {

  const body = request.body
  const user = await User.findOne({username:body.username})

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
  await Blog.deleteOne({ id: request.params.id })
  response.status(204).end()
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