const Path = require('path')
const FS = require('fs')

class Repository {
  constructor(datafile) {
    this.datafile = Path.join('data', datafile)
  }

  load() {
    let rawData = FS.readFileSync(this.datafile)
    return JSON.parse(rawData)
  }

  // This method receives the data to be saved on disk
  // as a Javascript object.
  save(data) {
    FS.writeFileSync(this.datafile, JSON.stringify(data))
  }
}

module.exports = Repository