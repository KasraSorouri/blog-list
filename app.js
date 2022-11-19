const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
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

    app.use('/api/blogs',blogRouter)

    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

    module.exports = app