const { Image } = require('../models')
const { GenerateUploadUrl } = require('./S3')

const GetUploadUrl = async (req, res) => {
  try {
    const url = await GenerateUploadUrl(req.body.filename)
    res.send(url)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  GetUploadUrl
}