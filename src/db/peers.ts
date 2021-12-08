import Db from "../config/db";
import { Peer } from "../types/peer";

const addPeer = async (peer: Peer) => {
  await Db.peerDb?.put(`${peer.host}:${peer.port}`, {
    connectedAt: peer.connectedAt,
    throughputMbps: peer.throughputMbps,
  });
  return;
};

export { addPeer };
