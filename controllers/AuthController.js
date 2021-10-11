const { User } = require('../models')
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
      console.log(`user :>>`, user)
      let payload = {
        id: user.id,
        email: user.email,
        username: user.username
      }
      let token = middleware.createToken(payload)
      console.log('token :>> ', token);
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}

const Register = async (req, res) => {
  try {
    const { username, email, password, mobile, latitude, longitude } = req.body
    let location_latitude = parseFloat(latitude)
    let location_longitude = parseFloat(longitude)
    let password_digest = await middleware.hashPassword(password)
    const user = await User.create({ username, password_digest, email,  mobile, location_latitude, location_longitude })
    console.log(`user :>>`, user)
    res.send({ username: user.username, email: user.email })
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
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
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Login,
  Register,
  UpdatePassword,
  CheckSession
}
