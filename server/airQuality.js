import { Router } from 'express'
import bcrypt from 'bcrypt'
import User from './models/user'
import DEVICE from '../config/routes'
import auth from './authMiddleware'
import { persistAiq } from './service/airQuality'
import { createPayload } from './helper/serviceHelper'

export const airQualityRoutes = () => {
  const routes = new Router()

  routes.post(DEVICE.REGISTER.URL, async (req, res) => {
    try {
      const { email, password } = req.body
      const hasPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email,
        password: hasPassword,
      })
      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({
        message: err.message,
      })
    }
  })

  routes.post(DEVICE.STORE_VALUE.URL, auth, async (req, res) => {
    const reportedDeviceId = req.user.id
    const { name, value } = req.body
    const info = await persistAiq({
      reportedDeviceId,
      name,
      value,
    })
    return createPayload(info, res)
  })

  return routes
}
