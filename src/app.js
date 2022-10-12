require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const BottleService = require('./bottle/bottle-service')
const bottleRouter = require('./bottle/bottle-router')
const categoryRouter = require('./categories/category-router')
const userRouter = require('./user/user-router')
const authRouter = require('./auth/auth-router')
const inventoryRouter = require('./inventory/inventory-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common'

app.use(morgan(morganOption))
app.use(express.json())
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use('/api/auth', authRouter)
app.use('/api/bottles', bottleRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/users', userRouter)



app.use(function errorHandler(error, req, res, next) {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app