const { Cart, User } = require('../models')
const { stripe } = require('./Stripe')

const GetAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      include: [{
        model: User,
        as: 'cart_owner',
        attributes: {
          exclude: ['password_digest']
        }
      }]
    })
    return res.send(carts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetCartById = async (req, res) => {
  try {
    const carts = await Cart.findByPk(req.params.cart_id)
    return res.send(carts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const CreateNewCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body)
    res.send(cart)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetAllUserCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      include: {
        model: User,
        as: 'cart_owner'
      }
    });
    return res.send(carts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const DeleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({where: { id: req.params.cart_id}})
    const deletedCart = await cart.destroy({returning: true})
    return res.send({msg: "Deleted Cart", deleted: deletedCart, payload: req.params.id})
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const Checkout = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/cancel",
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

module.exports = {
  GetAllCarts,
  GetCartById,
  CreateNewCart,
  GetAllUserCarts,
  DeleteCart,
  Checkout
}