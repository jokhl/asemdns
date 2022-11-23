const Domain = require('../entities/domain')
const Record = require('../entities/record')

exports.index = function(req, res) {
  let repo = req.app.locals.repositories.domainRepository
  res.render('domains/index', { domains: repo.domains })
}

exports.new = function(req, res) {
  res.render('domains/new')
}

exports.create = function(req, res) {
  let repo = req.app.locals.repositories.domainRepository

  try {
    let { error, value } = Domain.create(req.body)

    if (error) {
      res.render('domains/new', { notifications: { errors: error.details.map(e => e.message) } })
    }
    else {
      value.records = {}
      repo.add(value)
      res.render('domains/index', { domains: repo.domains, notifications: { success: [`Domain '${value.name}' successfully added.`] } })
      let ipc = req.app.locals.ipc
      ipc.send('refresh')
    }
  }
  catch(error) {
    res.render('domains/new', { notifications: { errors: [error] } })
  }
}

exports.destroy = function(req, res) {
  let repo = req.app.locals.repositories.domainRepository

  try {
    repo.destroy(req.params.name)
    res.render('domains/index', { domains: repo.domains, notifications: { success: [`Domain '${req.params.name}' successfully deleted.`] } })
    let ipc = req.app.locals.ipc
    ipc.send('refresh')
  }
  catch(error) {
    res.render('domains/index', { domains: repo.domains, notifications: { errors: [error] } })
  }
}

exports.view = function(req, res) {
  let repo = req.app.locals.repositories.domainRepository
  let domain = repo.find(req.params.name)
  
  if (domain) {
    res.render('domains/view', { domain: domain, recordTypes: Record.TYPES })
  }
  else {
    res.render('domains/index', { domains: repo.domains, notifications: { errors: `Could not find domain ${req.params.name}.` } })
  }
}
