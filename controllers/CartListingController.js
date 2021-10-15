const { CartListing } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GetAllCartListings = async (req, res) => {
  try {
    const cartItems = await CartListing.findAll()
    return res.send(cartItems)
  } catch (error) {
    return res.status(500).send(error.message) 
  }
}

const AddToCart = async (req , res) => {
  try {
    const cartItem = await CartListing.create(req.body)
    return res.send(cartItem)
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

module.exports = { GetAllCartListings, AddToCart, RemoveFromCart }