const { CartListing } = require('../models')
// const { Sequelize } = require("sequelize");

const GetAllCartListings = async (req, res) => {
  try {
    const cartlistings = await CartListing.create(req.body)
    return res.send(cartlistings)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetCartListingById = async (req, res) => {
  try {
    const cartslisting = await Cart.findByPk(req.params.cartlisting_id)
    return res.send(cartslisting)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  GetAllCartListings,
  GetCartListingById
}
