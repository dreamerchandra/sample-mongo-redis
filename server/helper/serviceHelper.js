import { STATUS } from '../service/airQuality'

export function createPayload(info, res) {
  switch (info.status) {
    case STATUS.CREATED:
      return res.status(201).json(info.payload)
    case STATUS.SCHEDULED:
      return res.status(202).json(info.payload)
    case STATUS.ERROR:
      return res.status(500).json(info)
    default:
      return res.status(200)
  }
}
