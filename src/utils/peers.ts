import levelup, { LevelUp } from 'levelup'
import hardcodedPeers from '../constants/peers.json'


const getPeers = async (db: LevelUp) => {
  let currentPeers: string[] = []
  try {
    currentPeers = await db.get('current')
  } catch (err) {
    if ((err as any).notFound) {
      await db.put('current', hardcodedPeers)
      currentPeers = await getPeers(db)
    }
  }

  return currentPeers
}

export {
  getPeers
}