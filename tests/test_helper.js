const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
    likes: 7,
    user:'638bf6297cd52fe556d95d31'
        
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 1
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 1
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
      }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const userInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialUser = async () => {
  const user = new User ({
    username: 'username',
    name: 'user',
    passwordHash: await bcrypt.hash('1234',10),
  })
  await user.save()
}

const tokenMaker = async () => {
  await initialUser()
  const user = await User.findOne({ username : 'username' })
  const userForToken = {
    username : user.username,
    id : user._id
  }

  const token = await jwt.sign(userForToken, process.env.SECRET)
  return token
}

module.exports = {
  initialBlogs,
  blogsInDb,
  userInDb,
  initialUser,
  tokenMaker
}
