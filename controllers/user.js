const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { request, response } = require('express')

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        passwordHash,
        name
    })
    
    await user.save()
    response.status(200).json(user)
})

module.exports = userRouter