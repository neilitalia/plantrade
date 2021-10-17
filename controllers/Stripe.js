const { Cart, Listing, Image } = require('../models')
const dotenv = require('dotenv')
dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const BASE_URL =  process.env.NODE_ENV === 'production' ? process.env.DEPLOYED_URL : "http://localhost:8080"
const AWS_BASE_URL = "https://plantrade.s3.us-east-2.amazonaws.com/"
const IMAGE_PLACEHOLDER_URL = "https://images.unsplash.com/photo-1562619227-71c891fd2799?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2626&q=80"
const DISCOUNT_CODE = [...process.env.DISCOUNT_CODE]

const getAllCartItems = async (id) => {
  try {
    const cartItems = await Cart.findOne({
      where: { id: id },
      attributes: { exclude: ['id','name','user_id','createdAt','updatedAt'] },
      include: {
        model: Listing,
        as: 'cart_listing',
        attributes: { exclude: ['createdAt','updatedAt','views'] },
        through: {
          as: 'cart_info',
          attributes: ['quantity']
        },
        include: {
          model: Image,
          as: 'image_listing',
          attributes: { exclude: ['createdAt','updatedAt','id','user_id','listing_id'] },
        }
      }
    })
    return cartItems.cart_listing
  } catch (error) {
    throw error
  }
}

const getLineItems = async (id) => {
  const items = await getAllCartItems(id)
  return items.map(item => {
    return {
      price_data: {
      currency: 'USD',
      product_data: {
        name: item.title,
        description: item.description,
        images: item.image_listing.length ? [`${AWS_BASE_URL}${item.image_listing[0].file_name}`] : [`${IMAGE_PLACEHOLDER_URL}`],
        tax_code: 'txcd_99999999'
      },
      unit_amount: parseInt(item.price*100)
      },
      quantity: item.cart_info.quantity
    }
  })
}

const Checkout = async (req, res) => {
  try {
    const line_items = await getLineItems(req.body.cart_id)
    const session = await stripe.checkout.sessions.create({
      success_url: `${BASE_URL}/success`,
      cancel_url: `${BASE_URL}/cancel`,
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      allow_promotion_codes: true
    })
    res.send(session)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


module.exports = {Checkout} 