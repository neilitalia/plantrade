const { CartListing } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GetAllCartListings = async (req, res) => {
  try {
    const cartItems = await CartListing.findAll({
      attributes: { include: ['id']}, 
    })
    return res.send(cartItems)
  } catch (error) {
    return res.status(500).send(error.message) 
  }
}

const AddToCart = async (req , res) => {
  try {
    const quantity = 1
    const cartItem = await CartListing.create({...req.body, quantity})
    return res.send(cartItem)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const IncreaseQuantityInCart = async (req, res) => {
  try {
    const amount = req.body.increment ? req.body.increment : 1
    const cartItem = await CartListing.increment(
      { quantity: amount },
      { where: {
          [Op.and]: [
            { cart_id: req.body.cart_id },
            { listing_id: req.body.listing_id }
          ]
        }
      }
      )
    if (cartItem){
      return res.send(cartItem[0][0][0])
    }
    return res.status(500).send(error.message)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const DecreaseQuantityInCart = async (req, res) => {
  try {
    const amount = req.body.decrement ? req.body.decrement : 1
    const cartItem = await CartListing.decrement(
      { quantity: amount },
      { where: {
          [Op.and]: [
            { cart_id: req.body.cart_id },
            { listing_id: req.body.listing_id }
          ]
        }
      }
      )
    if (cartItem){
      return res.send(cartItem[0][0][0])
    }
    return res.status(500).send(error.message)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const RemoveFromCart = async (req , res) => {
  try {
    const deletedItem = await CartListing.destroy({
      where: { 
        [Op.and]: [
          { cart_id: req.body.cart_id },
          { listing_id: req.body.listing_id }
        ]
      },
      limit: 1,
      returning: true
    })
    return res.send({msg: "Removed from cart", payload: req.body, deleted: deletedItem})
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = { GetAllCartListings, AddToCart, RemoveFromCart, IncreaseQuantityInCart, DecreaseQuantityInCart }