const IPC = require('node-ipc')
const { spawn } = require('child_process')

IPC.config.socketRoot = '/tmp/'
IPC.config.appspace = 'asemdns'
IPC.config.id = 'master'
IPC.config.silent = true

IPC.serve(() => {
  console.log("Starting IPC server.")
  IPC.server.on('refresh', (data, socket) => {
    console.log(`Master received refresh message.`)
    IPC.server.broadcast('refresh', {})
  })
  startServers()
})

IPC.server.start()

function startServers() {
  const WebServer = spawn('node', ['web.js'])
  WebServer.stdout.on('data', data => console.log(`Web Server: ${data}`))
  WebServer.stderr.on('data', data => console.error(`Web Server: ${data}`))
  WebServer.on('close', code => console.log(`Web server exited with code ${code}.`))

  const DNSServer = spawn('node', ['dns.js'])
  DNSServer.stdout.on('data', data => console.log(`DNS Server: ${data}`))
  DNSServer.stderr.on('data', data => console.error(`DNS Server: ${data}`))
  DNSServer.on('close', code => console.log(`DNS server exited with code ${code}.`))
}