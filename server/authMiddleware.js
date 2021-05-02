const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) throw new Error('Invalid token')
    next()
  } catch {
    res.status(401).json({
      error: 'Unauthorized',
    })
  }
}

export default auth
