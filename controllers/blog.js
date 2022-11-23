const blogRouter = require('express').Router()
const { json } = require('express')
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
  blogRouter.post('/', async (request, response) => {
    const blogObject = new Blog(request.body)
  
    const blog = await blogObject.save()
    response.status(201)
    response.json(Blog)
  })

  module.exports = blogRouter