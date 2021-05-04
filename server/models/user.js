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

export default Mongoose.model('user', user)
