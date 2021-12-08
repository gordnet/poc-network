import jayson from "jayson/promise";
import {
  addPeerCommand,
  getPeersCommand,
  removePeerCommand,
} from "../rpcCommands/peers";

const startJsonRpcService = async (port: number) => {
  const server = new jayson.Server({
    "peers.get": getPeersCommand,
    "peers.add": addPeerCommand,
    // removePeer: removePeerCommand,
  });

  console.log("JSON RPC Server listening on port " + port);
  return server.http().listen(port);
};

export default startJsonRpcService;
