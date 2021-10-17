const { Cart, User, Listing } = require('../models')

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

module.exports = {
  GetAllCarts,
  GetCartById,
  CreateNewCart,
  GetAllUserCarts,
  DeleteCart
}