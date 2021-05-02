import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

export const airQualityRoutes = () => {
  const routes = new Router()
  const airQuality = [
    { id: 1, name: 'test data', value: 12, customerName: uuidv4() },
    { id: 2, name: 'second', value: 1200, customerName: uuidv4() },
  ]

  routes.get('/api/v1/air-quality', (req, res) => {
    res.json(airQuality)
  })

  return routes
}
