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

module.exports = blogRouter