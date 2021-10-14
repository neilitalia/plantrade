const { User, Cart, Listing } = require('../models')

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password_digest']
      }
    })
    res.send(users)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id, {
      attributes: {
        exclude: ['password_digest']
      }
    })
    if(user) return res.send(user)
    res.status(400).send({ error: 'No User Found' })
  } catch (error) {
    res.status(500).send({ error: error })
  }
}

const GetUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username},
      attributes: {
        exclude: ['password_digest']
      }
    })
    if(user) return res.send(user)
    res.status(400).send({ error: 'No User Found' })
  } catch (error) {
    res.status(500).send({ error: error })
  }
}

const UpdateUser = async (req, res) => {
  try {
    const user = await User.update(
      { username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile
      },
      { where: { id: req.params.user_id }, returning: true }
    )
    res.send(user)
  } catch (error) {
    res.status(500).send({ error: error })
  }
}

const GetUserCartItems = async (req, res) => {
  try {
    const userCart = await User.findAll({
      where: {id: req.params.user_id},
      attributes: {exclude: ['password_digest']},
      include: {
        model: Cart,
        as: 'cart_owner',
        group: ['cart.name'],
        include: {
          model: Listing,
          as: 'cart_listing',
          through:{
            attributes: []
          }
        }
      }
    });
    return res.send(userCart)
  } catch (error) {
    res.status(500).send({ error: error })
  }
}

module.exports = {
  GetAllUsers,
  GetUserById,
  GetUserByUsername,
  UpdateUser,
  GetUserCartItems
}
