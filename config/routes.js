const METHOD = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  DELETE: 'delete',
}

const DEVICE = {
  REGISTER: {
    URL: '/api/device/v1/create',
    METHOD: METHOD.POST,
  },
  STORE_VALUE: {
    URL: '/api/device/v1/value/store',
    METHOD: METHOD.POST,
  },
}

export default DEVICE
