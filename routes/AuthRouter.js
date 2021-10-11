const { Router } = require('express')
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')
const AuthRouter = Router()

AuthRouter.post('/login', controller.Login)
AuthRouter.post('/register', controller.Register)
AuthRouter.put(
  '/update',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
AuthRouter.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)
AuthRouter.post(
  '/delete',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUser
)
module.exports = AuthRouter
