import Queue from 'bee-queue'

const options = {
  removeOnSuccess: true,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
}

export const aiqQueue = new Queue('aiq', options)
