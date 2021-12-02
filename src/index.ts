import http from 'http'
import https from 'https'
import { program } from 'commander'

program
  .description('A node in the network')
  .option('-p, --port <port>', 'Port to listen to')

program.parse();

const options = program.opts()
const PORT = options.port as number || 10309

const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
  if (request.headers['content-type'] !== 'application/json') {
    return response.writeHead(400).end('Invalid content-type')
  }

  let data = '';
  request.on('data', chunk => {
    data += chunk;
  })

  request.on('end', () => {
    let requestData: any = {}
    try {
      requestData = JSON.parse(data)
    } catch (e) {
      return response.writeHead(400).end('Invalid JSON')
    }

    const [protocol, urlPath] = requestData.destination.split('://')

    let requestOptions: any = {
      hostname: urlPath.split('/')[0],
      port: protocol === 'https' ? 443 : 80,
      path: urlPath.split('/').slice(1).join('/'),
      method: 'GET'
    }

    let destinationData = ''


    if (requestData.nodes?.length > 0) {
      // We need to forward this request to another node
      const destination = requestData.nodes[0]

      destinationData = JSON.stringify({
        destination: requestData.destination,
        nodes: requestData.nodes.slice(1),
      })

      requestOptions.hostname = destination.split(':')[0]
      requestOptions.port = destination.split(':')[1]
      delete requestOptions.path
      requestOptions.method = 'POST'
      requestOptions.headers = {
        'Content-Type': 'application/json',
        'Content-Length': destinationData.length
      }
    }

    const httpLibrary = requestOptions.port === 443 ? https : http

    console.log({ requestOptions })

    const newRequest = httpLibrary.request(requestOptions, async (res) => {
      res.on('data', (d) => {
        response.write(d)
      })

      res.on('end', () => {
        response.end()
      })
    })

    newRequest.on('error', error => {
      console.log({ error })
      return response.writeHead(500).end(error.message)
    })

    if (destinationData?.length > 0) {
      console.log({ destinationData })
      newRequest.write(destinationData)
    }

    newRequest.end()
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

