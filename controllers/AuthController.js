const { User, Cart } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.password_digest,
        req.body.password
      ))
    ) {
      let payload = {
        id: user.id,
        email: user.email,
        username: user.username
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}

const Register = async (req, res) => {
  try {
    const { username, email, password, mobile, latitude, longitude } = req.body
    let location_latitude = parseFloat(latitude)
    let location_longitude = parseFloat(longitude)
    let password_digest = await middleware.hashPassword(password)
    const user = await User.create({ username, password_digest, email,  mobile, location_latitude, location_longitude })
    if(user){
      const cart = await Cart.bulkCreate([{name: "Cart", user_id: user.id}, {name: "Wishlist", user_id: user.id}])
      res.send({ username: user.username, email: user.email, cart: cart })
    }
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.password_digest,
        req.body.oldPassword
      ))
    ) {
      let newPassword = await middleware.hashPassword(req.body.newPassword)
      let newUser = await User.update(
        { password_digest: newPassword},
        { where: { username: req.body.username },
          returning: true}
      )
      return res.send({ status: 'Password Updated', payload: req.body, updated: newUser[0] })
    }
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}

const DeleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.password_digest,
        req.body.password
      ))
    ) {
      let deletedUser = await User.destroy(
        { where: { username: req.body.username },
          returning: true
        }
      )
      return res.send({ status: 'Account Deleted', payload: req.body, deleted: deletedUser })
    }
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  return res.send(payload)
}

module.exports = {
  Login,
  Register,
  UpdatePassword,
  DeleteUser,
  CheckSession
}
