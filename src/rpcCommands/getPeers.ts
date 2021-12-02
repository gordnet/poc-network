/// <reference path="../types/global.d.ts" />

import levelup from 'levelup'
import leveldown from 'leveldown'

const getPeersCommand = async () => {
  console.log('here we go')
  const peerDb = levelup(leveldown(`${process.cwd()}/data/peers.${global.PORT}`))

  let currentPeers: string[] = []

  return new Promise((resolve, reject) => {
    let peerKeys: string[] = []
    const keyStream = peerDb.createKeyStream()
      .on('data', function (data) {

      })
      .on('end', () => {
        console.log('end')
      })

  })

}

export default getPeersCommand