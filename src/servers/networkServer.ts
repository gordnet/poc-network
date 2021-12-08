import net from "net";
import { addPeer } from "../db/peers";
import { peerConnect } from "../peers/connect";
import { ping } from "../rpcCommands/ping";
import { RpcRequest } from "../types/rpc";

const onConnection = async (socket: net.Socket) => {
  const remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
  console.log("new client connection from %s", remoteAddress);

  socket.on("data", async (data: Buffer) => {
    console.log("received data from %s:", remoteAddress);

    let parsedData: RpcRequest | null = null;
    try {
      parsedData = JSON.parse(data.toString());
    } catch (e) {
      console.log(e);
      await socket.write("Invalid JSON");
      return socket.end();
    }

    const { method, params, id } = parsedData as RpcRequest;
    let response = "";

    try {
      switch (method) {
        case "ping":
          response = JSON.stringify({
            id,
            result: ping(),
          });
          break;
        case "peers.connect": {
          const { host, port } = params;
          const connectionResponse: any = await peerConnect(host, port);
          const dbResponse = await addPeer({
            host,
            port,
            connectedAt: new Date(),
            throughputMbps: connectionResponse.throughputMbps,
          });
          console.log({ connectionResponse });
          break;
        }

        case "peers.check":
          response = "ok";
          break;
      }
    } catch (err: any) {
      response = err.message;
    }

    await socket.write(response);

    return socket.end();
  });
};

const startNetworkServer = async (port: number) => {
  const server = net.createServer();

  server.on("connection", onConnection);

  return await server.listen(port, () => {
    console.log(`Network Server listening on port ${port}`);
    return;
  });
};

export default startNetworkServer;
