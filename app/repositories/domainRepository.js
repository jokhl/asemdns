const Repository = require('./repository')

const DATAFILE = 'domains.json'

class DomainRepository extends Repository {
  constructor() {
    super(DATAFILE)
    this.load()
  }
  
  load() {
    this.domains = super.load()
  }

  add(domain) {
    if (this.exists(domain)) {
      throw `Domain '${domain.name}' already exists.`
    }
    else {
      this.domains.push(domain)
      this.save()
    }
  }

  destroy(name) {
    if (this.exists({ name: name })) {
      this.domains = this.domains.filter(domain => domain.name !== name)
      this.save()
    }
    else {
      throw `Domain '${name}' does not exist.`
    }
  }

  update(name, newDomain) {
    let idx = this.domains.findIndex(curr => curr.name === name)
    this.domains.splice(idx, 1, newDomain)
    this.save()
  }

  save() {
    super.save(this.domains)
  }

  exists(domain) {
    let dupe = this.domains.find(curr => curr.name === domain.name)
    return dupe !== undefined
  }

  find(name) {
    return this.domains.find(curr => curr.name === name)
  }
}

module.exports = DomainRepository