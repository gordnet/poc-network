import http from 'http'
import levelup from 'levelup'
import leveldown from 'leveldown'
import fetch from 'node-fetch'
import { program } from 'commander'
import { getPeers } from './utils/peers'

program
  .description('A node in the network')
  .option('-p, --port <port>', 'Port to listen to')

program.parse();

const options = program.opts()
const CWD = process.cwd()
const PORT = options.port || 10309
const peerDb = levelup(leveldown(`${CWD}/data/peers.${PORT}`))

const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
  response.writeHead(200);
  response.end('Hello, World!');
}

const bootstrap = async () => {
  const server = http.createServer(requestHandler)
  const peers = await getPeers(peerDb)

  console.log(peers.toString())

  const reqOptions = {
    hostname: peers[1].split(':')[0],
    port: peers[1].split(':')[1],
  }
  console.log({ reqOptions })
  const req = http.request(reqOptions, async (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      console.log('data', d.toString())
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end()

  console.log('Listening on port ' + PORT)
  return server.listen(PORT)
}

bootstrap()

