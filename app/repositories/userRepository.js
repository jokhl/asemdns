const Repository = require('./repository')

const DATAFILE = 'users.json'

class UserRepository extends Repository {
  constructor() {
    super(DATAFILE)
    this.load()
  }
  
  load() {
    this.users = super.load()
  }

  add(user) {
    if (this.exists(user)) {
      throw `User '${user.username}' already exists.`
    }
    else {
      this.users.push(user)
      this.save()
    }
  }

  destroy(username) {
    if (this.exists({ username: username })) {
      this.users = this.users.filter(user => user.username !== username)
      this.save()
    }
    else {
      throw `User '${username}' does not exist.`
    }
  }

  save() {
    super.save(this.users)
  }

  exists(user) {
    let dupe = this.users.find(curr => curr.username === user.username)
    return dupe !== undefined
  }

  find(username) {
    return this.users.find(curr => curr.username === username)
  }
}

module.exports = UserRepository