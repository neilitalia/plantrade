const { Cart, User, Listing, Image, CartListing } = require('../models')

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

const GetAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.findOne({
      where: { id: req.params.cart_id },
      attributes: { exclude: ['createdAt','updatedAt'] },
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
    return res.send(cartItems)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const DeleteCart = async (req, res) => {
  try {
    const id = req.params.cart_id
    const deletedCartListings = CartListing.destroy({ where: { cart_id: id} })
    const cart = await Cart.findOne({where: { id: id }})
    const deletedCart = await cart.destroy({returning: true})
    return res.send({msg: "Deleted Cart", payload: { cart_id: id }, deleted: [deletedCart, deletedCartListings]})
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  GetAllCarts,
  GetCartById,
  CreateNewCart,
  GetAllUserCarts,
  GetAllCartItems,
  DeleteCart
}