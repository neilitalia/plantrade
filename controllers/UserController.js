const { User, Cart, Listing, Image, CartListing } = require('../models')

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password_digest']
      }
    })
    return res.send(users)
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
    return res.status(400).send({ error: 'No User Found' })
  } catch (error) {
    return res.status(500).send({ error: error })
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
    return res.status(400).send({ error: 'No User Found' })
  } catch (error) {
    return res.status(500).send({ error: error })
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
    return res.send(user)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

const GetUserCartsList = async (req, res) => {
  try {
    const userCart = await User.findOne({
      where: {id: req.params.user_id},
      attributes: {exclude: ['password_digest']},
      include: {
        model: Cart,
        as: 'cart_owner',
      }
    });
    return res.send(userCart)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

const GetUserCartItems = async (req, res) => {
  try {
    const userCart = await User.findOne({
      where: {id: req.params.user_id},
      attributes: { exclude: ['password_digest', 'email', 'mobile', 'location_latitude', 'location_longitude', 'createdAt', 'updatedAt']},
      include: {
        model: Cart,
        as: 'cart_owner',
        group: ['cart.name'],
        attributes: { exclude: ['createdAt', 'updatedAt', 'user_id'] },
        include: {
          model: Listing,
          as: 'cart_listing',
          through:{
            as: 'cart_info',
            attributes: ['quantity']
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: {
            model: Image,
            as: 'image_listing',
            attributes: { exclude: ['createdAt', 'updatedAt', 'user_id', 'listing_id'] },
          },
        }
      }
    });
    return res.send(userCart)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

module.exports = {
  GetAllUsers,
  GetUserById,
  GetUserByUsername,
  UpdateUser,
  GetUserCartItems,
  GetUserCartsList
}
