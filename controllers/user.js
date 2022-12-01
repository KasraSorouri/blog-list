const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',['url', 'title', 'likes'])
    response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        return response.status(400).json({
            error: 'password must have at least 3 character length'
        })
    }

    const existUser = await User.findOne({ username })
    if (existUser) {
        response.status(400).json({
            error: 'this username is taken before'
        })
    }
    
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