const dotenv = require('dotenv')
dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2020-08-27',
})

export default stripe