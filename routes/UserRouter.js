const { Router } = require('express')
const controller = require('../controllers/UserController')
const middleware = require('../middleware')
const UserRouter = Router()

UserRouter.get(
  '/all', 
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllUsers
)

UserRouter.get(
  '/id/:user_id', 
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserById
)

UserRouter.get(
  '/:username', 
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserByUsername
)

UserRouter.put(
  '/update/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateUser
)

module.exports = UserRouter
