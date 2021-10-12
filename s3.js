const aws = require('aws-sdk')
const crypto = require('crypto')
require('dotenv').config()

const region = "us-east-2"
const bucketName = "plantrade"
const accessKey = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKey,
  secretAccessKey,
  signatureVersion: 4
})

const GenerateUploadUrl = async () => {
  const random = await crypto.randomBytes(16)
  const imageName = random.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
  return uploadUrl
}

module.exports = {
  GenerateUploadUrl
}