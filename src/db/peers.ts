import { serialize, deserialize } from "bson";
import Db from "../config/db";
import { Peer } from "../types/peer";

const addPeer = async (peer: Peer) => {
  const val = serialize(peer);
  const dbRes = await Db.peerDb?.put(`${peer.host}:${peer.port}`, val);

  console.log({ dbRes });
  return;
};

const getPeers: () => Promise<Peer[]> = async () => {
  const peers: Peer[] = [];
  return new Promise((resolve, reject) => {
    Db?.peerDb
      ?.createReadStream({ keys: true, values: true })
      .on("data", function (data) {
        peers.push(deserialize(data.value) as Peer);
      })
      .on("error", reject)
      .on("end", () => resolve(peers));
  });
};

export { addPeer, getPeers };
