module.exports = function(req, res, next) {
  if ('currentUser' in req.session || req.path === '/login') {
    next()
  }
  else {
    res.redirect('/login')
  }
}