import { airQualityApi } from './airQuality'
import { httpClient } from './httpClient'
import { todosApi } from './todosApi'

export function apiFactory(http) {
  return {
    todos: todosApi(http),
    airQuality: airQualityApi(http),
  }
}

const http = httpClient('http://localhost:3000')
export const api = apiFactory(http)
