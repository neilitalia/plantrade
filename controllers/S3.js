const aws = require('aws-sdk')
const crypto = require('crypto')
const {promisify} = require('util')
require('dotenv').config()

const region = "us-east-2"
const bucketName = "plantrade"
const accessKey = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const randomBytes = promisify(crypto.randomBytes)

const s3 = new aws.S3({
  region,
  accessKey,
  secretAccessKey,
  signatureVersion: 'v4'
})

const GenerateUploadUrl = async () => {
  
  const random = await randomBytes(16)
  const fileName = random.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: fileName,
    Expires: 60
  })

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
  return {uploadUrl: uploadUrl}
}

module.exports = {
  GenerateUploadUrl
}