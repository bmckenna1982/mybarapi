const path = require('path')
const express = require('express')
const xss = require('xss')
const UserService = require('./user-service')

const userRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
  id: user.id,  
  email: xss(user.email),
  date_created: user.date_created,
})

userRouter
  .post('/', jsonParser, (req, res, next) => {
    console.log('body', req.body);    
    const { user_name, email, password } = req.body.newUser
    const newUser = { user_name, email, password }

    for (const [key, value] of Object.entries(newUser)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    const passwordError = UserService.validatePassword(password)
    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UserService.UserExists(
      req.app.get('db'),
      email,
      user_name
    )
      .then(hasUser => {
        if (hasUser)
          return res.status(400).json({ error: 'User already registered' })

        return UserService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,              
              email,
              password: hashedPassword              
            }

            return UserService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  // .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(serializeUser(user))
              })
          })
          .catch(next)
      })

  })

userRouter
  .route('/:user_id')
  .all((req, res, next) => {
    UserService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: `User doesn't exist` }
          })
        }
        res.user = user
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeUser(res.user))
  })
  .delete((req, res, next) => {
    UserService.deleteUser(
      req.app.get('db'),
      req.params.user_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { first_name, last_name, email, password } = req.body
    const userToUpdate = { first_name, last_name, email, password }

    const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'fullname', 'Email', 'password' or 'nickname'`
        }
      })

    UserService.updateUser(
      req.app.get('db'),
      req.params.user_id,
      userToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = userRouter