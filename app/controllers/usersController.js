const User = require('../entities/user')
const Utils = require('../lib/utils')

exports.index = function(req, res) {
  let repo = req.app.locals.repositories.userRepository
  res.render('users/index', { users: repo.users })
}

exports.new = function(req, res) {
  res.render('users/new')
}

exports.create = function(req, res) {
  let repo = req.app.locals.repositories.userRepository

  try {
    let { error, value } = User.create(req.body)

    if (error) {
      res.render('users/new', { notifications: { errors: error.details.map(e => e.message) } })
    }
    else {
      delete value['password_confirmation']
      let salt = Utils.getRandom(128)
      value.salt = salt
      let hash = Utils.encrypt(value.password, salt)
      value.password = hash
      repo.add(value)
      res.render('users/index', { users: repo.users, notifications: { success: [`User '${value.username}' successfully added.`] } })
    }
  }
  catch(error) {
    res.render('users/new', { notifications: { errors: [error] } })
  }
}

exports.destroy = function(req, res) {
  let repo = req.app.locals.repositories.userRepository

  try {
    repo.destroy(req.params.username)
    res.render('users/index', { users: repo.users, notifications: { success: [`User '${req.params.username}' successfully deleted.`] } })
  }
  catch(error) {
    res.render('users/index', { users: repo.users, notifications: { errors: [error] } })
  }
}