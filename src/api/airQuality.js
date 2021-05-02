export function airQualityApi(http) {
  return {
    getAllQuality: () => {
      return http.get('/api/v1/air-quality')
    },
  }
}
