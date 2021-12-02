import http from 'http'
import https from 'https'
import levelup from 'levelup'
import leveldown from 'leveldown'
import { program } from 'commander'
// import { getPeers } from './utils/peers'

program
  .description('A node in the network')
  .option('-p, --port <port>', 'Port to listen to')

program.parse();

const options = program.opts()
// const CWD = process.cwd()
const PORT = options.port as number || 10309
// const peerDb = levelup(leveldown(`${CWD}/data/peers.${global.PORT}`))

const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
  if (request.headers['content-type'] !== 'application/json') {
    return response.writeHead(400).end('Invalid content-type')
  }

  let data = '';
  request.on('data', chunk => {
    data += chunk;
  })
  request.on('end', () => {

    try {
      const requestData = JSON.parse(data)
      const [protocol, urlPath] = requestData.destination.split('://')

      const requestOptions = {
        hostname: urlPath.split('/')[0],
        port: protocol === 'https' ? 443 : 80,
        path: urlPath.split('/').slice(1).join('/'),
        method: 'GET'
      }

      const httpLibrary = protocol === 'https' ? https : http
      console.log({ requestOptions })
      const newRequest = httpLibrary.request(requestOptions, async (res) => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
          console.log('data', d.toString())
          response.write(d)
        })

        res.on('end', () => {
          response.end()
        })
      })
      console.log('after')

      newRequest.on('error', error => {
        console.error(error)
      })

      newRequest.end()

      console.log({ requestData })
    } catch (e) {
      console.log(e)
      return response.writeHead(400).end('Invalid JSON')
    }
  })

}

const bootstrap = async () => {
  const server = http.createServer(requestHandler)
  // const peers = await getPeers(peerDb)

  // console.log(peers.toString())

  // const reqOptions = {
  //   hostname: peers[1].split(':')[0],
  //   port: peers[1].split(':')[1],
  // }
  // console.log({ reqOptions })
  // const req = http.request(reqOptions, async (res) => {
  //   console.log(`statusCode: ${res.statusCode}`)

  //   res.on('data', d => {
  //     console.log('data', d.toString())
  //   })
  // })

  // req.on('error', error => {
  //   console.error(error)
  // })

  // req.end()

  console.log('Listening on port ' + PORT)
  return server.listen(PORT)
}

bootstrap()

