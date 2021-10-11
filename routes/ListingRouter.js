const { Router } = require('express')
const controller = require('../controllers/ListingController')
const middleware = require('../middleware')
const ListingRouter = Router()

ListingRouter.get(
  '/all',
  controller.GetAllListings
)

ListingRouter.get(
  '/id/:listing_id',
  controller.GetListingById
)

ListingRouter.post(
  '/new', 
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateListing
)

ListingRouter.put(
  '/archive/:listing_id', 
  middleware.stripToken,
  middleware.verifyToken,
  controller.ArchiveListing
)

ListingRouter.put(
  '/update/:listing_id', 
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateListing
)

ListingRouter.delete(
  '/delete/:listing_id', 
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteListing
)

module.exports = ListingRouter
