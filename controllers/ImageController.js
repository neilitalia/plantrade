const { Image } = require('../models')
const { GenerateUploadUrl } = require('../s3')

const GetUploadUrl = async (req, res) => {
  try {
    const url = GenerateUploadUrl()
    res.send({url})
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  GetUploadUrl
}