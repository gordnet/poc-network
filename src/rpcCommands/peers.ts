/// <reference path="../types/global.d.ts" />

import levelup from "levelup";
import leveldown from "leveldown";
import { Peer } from "../types/peer";

const getPeersCommand = async () => {
  const peerDb = levelup(
    leveldown(`${process.cwd()}/data/peers.${global.PORT}`)
  );
  const currentPeers: string[] = [];

  return new Promise((resolve, reject) => {
    const peerKeys: string[] = [];
    peerDb
      .createKeyStream()
      .on("data", function (data) {
        peerKeys.push(data.toString());
      })
      .on("end", () => {
        console.log({ peerKeys });
        // console.log('end', currentPeers)
        peerDb.close();
        return resolve(currentPeers);
      })
      .on("error", reject);
  });
};

const addPeerCommand = async (args: string[]) => {
  const peerDb = levelup(
    leveldown(`${process.cwd()}/data/peers.${global.PORT}`)
  );
  const nodeToAdd = args[0];
  const newNode: Peer = {
    ip: nodeToAdd.split(":")[0],
    port: parseInt(nodeToAdd.split(":")[1]),
  };

  await peerDb.put(nodeToAdd, JSON.stringify(newNode));
  console.log({ args });

  peerDb.close();
  return;
};

const removePeerCommand = async (args: string[]) => {};

export { getPeersCommand, addPeerCommand, removePeerCommand };
