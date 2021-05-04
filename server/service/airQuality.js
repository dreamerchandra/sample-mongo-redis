import Readings from '../models/value'
import { aiqQueue } from '../taskQueue'

export const STATUS = {
  CREATED: 'created',
  SCHEDULED: 'scheduled',
  ERROR: 'error',
}
const asCreated = (payload) => {
  return {
    status: 'created',
    payload,
  }
}
const asScheduled = (payload) => {
  return {
    status: 'scheduled',
    payload,
  }
}

const asError = (err) => {
  return {
    status: 'error',
    message: err.message,
  }
}

async function createJob(queue, info) {
  try {
    console.log('job is getting scheduled')
    await queue.createJob(info).backoff('fixed', 1000).save()
    return asScheduled(info)
  } catch (err) {
    console.log(`can't create queue ${err.message}`)
    return asError(err)
  }
}

export async function persistAiq(info) {
  try {
    console.log('trying to create aiq with', info)
    const reading = new Readings(info)
    const snap = await reading.save()
    console.log('saved to db', snap)
    return asCreated(snap)
  } catch (err) {
    console.log('writing to db thrown an error ', err.message)
    return createJob(aiqQueue, info)
  }
}

aiqQueue.process((job, done) => {
  console.log(job)
  done()
})
