const { Image } = require('../models')
const { GenerateUploadUrl } = require('./S3')

const GetUploadUrl = async (req, res) => {
  try {
    const url = await GenerateUploadUrl(req.body.filename)
    return res.send(url)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const AddImageToListing = async (req, res) => {
  try {
    const image = await Image.create(req.body)
    return res.send(image)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  GetUploadUrl,
  AddImageToListing
}