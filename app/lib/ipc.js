const NodeIPC = require('node-ipc')

class IPC {
  constructor(id) {
    this.instance = NodeIPC
    this.instance.config.socketRoot = '/tmp/'
    this.instance.config.appspace = 'asemdns'
    this.instance.config.silent = true
    this.id = id
    this.instance.connectTo(id)
  }

  send(event, payload={}) {
    this.instance.of[this.id].emit(event, payload)
    console.log(`Event '${event}' sent to '${this.id}'.`)
  }

  listen(event, cb) {
    this.instance.of[this.id].on(event, cb)
  }
}

module.exports = IPC