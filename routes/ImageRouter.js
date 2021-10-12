const { Router } = require('express')
const controller = require('../controllers/ImageController')
const ImageRouter = Router()

ImageRouter.get('/url', controller.GetUploadUrl)

module.exports = ImageRouter
