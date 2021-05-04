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

const Reading = () => {
  return Mongoose.models.readings || Mongoose.model('readings', readings)
}

export default Reading()
