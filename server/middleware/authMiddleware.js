import bcrypt from 'bcrypt'

const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) throw new Error('Invalid token')
    const { email, password, id } = JSON.parse(token)
    if (!id) throw new Error('Invalid token')
    const user = await User.findById(id)
    if (user.email === email && bcrypt.compare(password, user.password)) {
      req.user = JSON.parse(JSON.stringify(user))
      req.user.id = id
      next()
    } else throw new Error('Invalid token')
  } catch (err) {
    req.dbError = err
    next()
  }
}

export default auth
