import { getPeers } from "../db/peers";
import { Peer } from "../types/peer";
import { MAX_TIME_BETWEEN_HEARTBEATS } from "../constants/heartbeat.json";

const heartbeatTimer = () => {
  return setInterval(async () => {
    const dbRes: Peer[] = await getPeers();
    const CURRENT_TIME = Date.now();
    const peersToCheck: Peer[] = [];

    dbRes.forEach(async (peer) => {
      if (peer.heartbeatAt < CURRENT_TIME - MAX_TIME_BETWEEN_HEARTBEATS) {
        peersToCheck.push(peer);
      }
    });

    console.log({ peersToCheck });
  }, 60000);
};

export { heartbeatTimer };
