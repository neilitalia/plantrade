const { Router } = require('express')
const controller = require('../controllers/CartController')
const CartRouter = Router()

CartRouter.get('/all', controller.GetAllCarts)
CartRouter.get('/id/:cart_id', controller.GetCartById)
CartRouter.post('/new', controller.CreateNewCart)
CartRouter.post('/add', controller.AddToCart)
CartRouter.get('/fromuser/:user_id', controller.GetAllUserCarts)
CartRouter.post('/checkout')

module.exports = CartRouter
