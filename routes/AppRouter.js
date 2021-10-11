const { Router } = require('express')
const UserRouter = require('./UserRouter')
const ListingRouter = require('./ListingRouter')
const CartRouter = require('./CartRouter')
const ImageRouter = require('./ImageRouter')

const AppRouter = Router()

AppRouter.use('/users', UserRouter)
AppRouter.use('/listings', ListingRouter)
AppRouter.use('/cart', CartRouter)
AppRouter.use('/image', ImageRouter)


module.exports = AppRouter