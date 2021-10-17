const { Router } = require('express')
const controller = require('../controllers/CartController')
const middleware = require('../middleware')
const stripe = require('../controllers/Stripe')
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

CartRouter.get(
  '/itemsin/:cart_id',
  controller.GetAllCartItems
)

CartRouter.post(
  '/checkout',
  middleware.stripToken,
  middleware.verifyToken,
  stripe.Checkout
)

CartRouter.get(
  '/fromuser/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllUserCarts
)

CartRouter.delete(
  '/delete/:cart_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteCart
)

module.exports = CartRouter
