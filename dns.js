const DNS = require('native-dns')
const DomainRepository = require('./app/repositories/domainRepository')
const IPC = require('./app/lib/ipc')

let server = new DNS.createServer()
let repo = new DomainRepository()
let ipc = new IPC('master')

server.on('listening', () => console.log('DNS server listening on', server.address()))
server.on('close', () => console.log('DNS server closed', server.address()))
server.on('error', (err, buff, req, res) => console.error(err.stack))
server.on('socketError', (err, socket) => console.error(err))
server.on('request', handleRequest)

ipc.listen('refresh', (payload) => {
  console.log("Received refresh message.")
  repo.load()
})

server.serve(53)

function handleRequest(request, response) {
  console.log('request from', request.address.address, 'for', request.question[0].name);

  let f = [];

  request.question.forEach(question => {
    let entry = repo.domains.find(domain => new RegExp(domain.name, 'i').exec(question.name))
    if (entry) {
      for (let hostname in entry.records) {
        response.answer.push(getRecordObject(question.name, entry.records[hostname]))
      }
      response.send()
    }
    else {
    }
  })
}

function getRecordObject(hostname, record) {
  switch(record.type) {
    case "A":
      return {
        type: DNS.consts.nameToQtype(record.type),
        class: DNS.consts.NAME_TO_QCLASS.IN,
        name: hostname,
        ttl: record.ttl || 600,
        address: record.value
      }
    default:
      console.error(`Not supported DNS record type: ${record.type}.`)
  }
}