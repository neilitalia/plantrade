const { Router } = require('express')
const controller = require('../controllers/ImageController')
const middleware = require('../middleware')
const ImageRouter = Router()

ImageRouter.get(
  '/url',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUploadUrl
)

ImageRouter.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddImageToListing
)

module.exports = ImageRouter
