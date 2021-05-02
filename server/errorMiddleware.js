const errorMiddleware = (err, req, res, next) => {
  if (err) {
    console.log('comg here', err)
    res.status(500).json({
      error: 'Some terrible mistake',
    })
  }
  next()
}

export default errorMiddleware
