import levelup from 'levelup'
import leveldown from 'leveldown'

const peerDb = levelup(leveldown(`${CWD}/data/peers.${PORT}`))