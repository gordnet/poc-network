import http from 'http'
import levelup from 'levelup'
import leveldown from 'leveldown'
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

  console.log('Listening on port ' + PORT)
  return server.listen(PORT)
}

bootstrap()

