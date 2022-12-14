const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

logger.info('connecting to ',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('erroe connecting to MongoDB:',error.message)
    })

    app.use(cors())
    app.use(express.json())
    
    app.use(middleware.requestLogger)
    app.use(middleware.tokenExtractor)
    //app.use(middleware.userExtractor)

    app.use('/api/login', loginRouter)
    app.use('/api/blogs', blogRouter)
    app.use('/api/users',userRouter)

    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

    module.exports = app