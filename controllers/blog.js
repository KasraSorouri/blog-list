const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const blogObject = new Blog(request.body)
    
  const blog = await blogObject.save()
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