const { Router } = require('express')
const controller = require('../controllers/CartListingController')
const middleware = require('../middleware')
const CartListingRouter = Router()

CartListingRouter.get(
  '/all',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllCartListings
)

CartListingRouter.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddToCart
)

CartListingRouter.delete(
  '/remove',
  middleware.stripToken,
  middleware.verifyToken,
  controller.RemoveFromCart
)

CartListingRouter.put(
  '/increment',
  middleware.stripToken,
  middleware.verifyToken,
  controller.IncreaseQuantityInCart
)

CartListingRouter.put(
  '/decrement',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DecreaseQuantityInCart
)

module.exports = CartListingRouter
