import levelup, { LevelUp } from 'levelup'
import hardcodedPeers from '../constants/peers.json'


const getPeers = async (db: LevelUp) => {
  let currentPeers: string[] = []

  return new Promise((resolve, reject) => {
    const keyStream = db.createKeyStream()

  })

  return new Promise((resolve, reject) => {
    db.createReadStream()
      .on('data', function (data) {
        console.log(data.key, '=', data.value)
      })
      .on('error', reject)
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        return resolve(currentPeers)
      })

  })

  // let currentPeers: string[] = []
  // try {
  //   currentPeers = await db.get('current')
  // } catch (err) {
  //   if ((err as any).notFound) {
  //     console.log('hardcoded', hardcodedPeers)
  //     await db.put('current', hardcodedPeers)
  //     currentPeers = await getPeers(db)
  //   }
  // }

  // return currentPeers.toString().split(',')
}

export {
  getPeers
}