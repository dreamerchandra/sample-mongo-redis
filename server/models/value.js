import Mongoose from 'mongoose'

const readings = Mongoose.Schema({
  reportedDeviceId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
})

export default Mongoose.model('readings', readings)
