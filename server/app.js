import path from 'path'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import responseTime from 'response-time'
import Mongoose from 'mongoose'
import chalk from 'chalk'
import { renderServerSideApp } from './renderServerSideApp'
import { todoRoutes } from './todoApi'
import { airQualityRoutes } from './airQuality'
import errorMiddleware from './errorMiddleware'

require('dotenv').config()

const { PUBLIC_URL = '' } = process.env

// This export is used by our initialization code in /scripts
export const app = express()

Mongoose.connect(process.env.MONGO_DB_HOST)
Mongoose.set('useNewUrlParser', true)
Mongoose.set('useFindAndModify', false)
Mongoose.set('useCreateIndex', true)
const db = Mongoose.connection
db.on('error', (err) => {
  console.log(chalk.red('mongo db connection failed', err))
})

db.once('connected', () => {
  console.log(chalk.green('Mongo db connected'))
})

app.use(compression())
app.use(helmet())
app.use(express.json())

// Serve generated assets
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../build'), {
    maxage: Infinity,
  })
)

// Serve static assets in /public
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../public'), {
    maxage: '30 days',
  })
)

app.use(morgan('tiny'))

// Demo API endpoints
app.use(todoRoutes())

app.use(airQualityRoutes())

app.use(
  responseTime((_req, res, time) => {
    res.setHeader('X-Response-Time', `${time.toFixed(2)}ms`)
    res.setHeader('Server-Timing', `renderServerSideApp;dur=${time}`)
  })
)

app.use(renderServerSideApp)

app.use(errorMiddleware)
