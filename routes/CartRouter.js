const { Router } = require('express')
const controller = require('../controllers/CartController')
const middleware = require('../middleware')
const CartRouter = Router()

CartRouter.get(
  '/all',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllCarts
)

CartRouter.get(
  '/id/:cart_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetCartById
)

CartRouter.post(
  '/new',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateNewCart
)

CartRouter.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddToCart
)

CartRouter.get(
  '/fromuser/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllUserCarts
)

module.exports = CartRouter
