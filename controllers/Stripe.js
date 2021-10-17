const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const BASE_URL =  process.env.NODE_ENV === 'production' ? path.join(__dirname, '/checkout') : "http://localhost:8080"

const Checkout = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${BASE_URL}/success`,
      cancel_url: `${BASE_URL}/cancel`,
      payment_method_types: ['card'],
      line_items: [
        { price_data: {
          currency: 'USD',
          product_data: {
            name: 'OnlyFlanks 1time',
            description: 'test req',
            tax_code: 'txcd_99999999'
          },
          unit_amount: 1299
        },
        quantity: 3},
        { price_data: {
          currency: 'USD',
          product_data: {
            name: 'Just4Flans 1time',
            description: 'test req',
            tax_code: 'txcd_99999999'
          },
          unit_amount: 1599
        },
        quantity: 2}
      ],
      mode: 'payment'
    })
    res.send(session)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


module.exports = {Checkout} 