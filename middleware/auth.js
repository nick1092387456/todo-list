module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
    console.log('let me in!')
    console.log(req.isAuthenticated())
  },
}
