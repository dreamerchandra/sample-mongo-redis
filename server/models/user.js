import Mongoose from 'mongoose'

const user = Mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = () => {
  return Mongoose.models.user || Mongoose.model('user', user)
}

export default User()
