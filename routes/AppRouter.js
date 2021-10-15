const { Router } = require('express')
const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')
const ListingRouter = require('./ListingRouter')
const CartRouter = require('./CartRouter')
const ImageRouter = require('./ImageRouter')
const CartListingRouter = require('./CartListingRouter')

const AppRouter = Router()

AppRouter.get('/status', (req, res) => {
  res.send({ msg: "server running"})
})

AppRouter.use('/auth', AuthRouter)
AppRouter.use('/users', UserRouter)
AppRouter.use('/listings', ListingRouter)
AppRouter.use('/cart', CartRouter)
AppRouter.use('/image', ImageRouter)
AppRouter.use('/cartlisting', CartListingRouter)


module.exports = AppRouter