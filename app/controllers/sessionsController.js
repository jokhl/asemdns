const Session = require('../entities/session')
const Utils = require('../lib/utils')

exports.new = function(req, res) {
  res.render('sessions/new')
}

exports.create = function(req, res) {
  let userRepo = req.app.locals.repositories.userRepository

  try {
    let { error, value } = Session.create(req.body)

    if (error) {
      res.render('sessions/new', { notifications: { errors: error.details.map(e => e.message) } })
    }
    else {
      let user = userRepo.find(value.username)
      let hashAttempt = Utils.encrypt(value.password, user.salt)
      
      if (hashAttempt === user.password) {
        req.session.currentUser = user
        res.redirect('/')
      }
      else {
        res.render('sessions/new', { notifications: { errors: "Wrong password" } })
      }
    }
  }
  catch(error) {
    res.render('sessions/new', { notifications: { errors: [error] } })
  }
}

exports.destroy = function(req, res) {
  delete req.session.currentUser
  res.redirect('/login')
}