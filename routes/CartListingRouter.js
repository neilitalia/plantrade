const { Router } = require('express')
const controller = require('../controllers/CartListingController')
const CartListingRouter = Router()

CartListingRouter.get('/all', controller.GetAllCartListings)
CartListingRouter.get('/id/:cartlisting_id', controller.GetCartListingById)

module.exports = CartListingRouter
