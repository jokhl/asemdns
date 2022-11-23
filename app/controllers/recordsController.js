const Record = require('../entities/record')

exports.create = function(req, res) {
  let repo = req.app.locals.repositories.domainRepository
  let domain = repo.find(req.params.name)
  let newDomain = domain

  try {
    let { error, value } = Record.create(req.body)

    if (error) {
      res.render('domains/view', { domain: domain, recordTypes: Record.TYPES, notifications: { errors: error.details.map(e => e.message) } })
    }
    else {
      newDomain.records[value.hostname] = { type: value.type, value: value.value }
      repo.update(domain.name, newDomain)
      res.render('domains/view', { domain: newDomain, recordTypes: Record.TYPES, notifications: { success: [`Record '${value.hostname}' successfully added.`] } })
      let ipc = req.app.locals.ipc
      ipc.send('refresh')
    }
  }
  catch(error) {
    res.render('domains/new', { domain: domain, notifications: { errors: [error] } })
  }
}

exports.destroy = function(req, res) {
  let repo = req.app.locals.repositories.domainRepository
  let domain = repo.find(req.params.name)
  let newDomain = domain

  try {
    delete newDomain.records[req.params.hostname]
    repo.update(domain.name, newDomain)
    res.render('domains/view', { domain: newDomain, recordTypes: Record.TYPES, notifications: { success: [`Record '${req.params.hostname}' of domain '${req.params.name}' successfully deleted.`] } })
    let ipc = req.app.locals.ipc
    ipc.send('refresh')
  }
  catch(error) {
    res.render('domains/index', { domains: repo.domains, notifications: { errors: [error] } })
  }
}
