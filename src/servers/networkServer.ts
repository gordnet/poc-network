import net from "net";
import { peerConnect } from "../peers/connect";
import { ping } from "../rpcCommands/ping";

const onConnection = async (socket: net.Socket) => {
  const remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
  console.log("new client connection from %s", remoteAddress);

  socket.on("data", async (data: Buffer) => {
    console.log("received data from %s:", remoteAddress);

    try {
      const { method, params, id } = JSON.parse(data.toString());

      let response = "";
      switch (method) {
        case "ping":
          response = JSON.stringify({
            id,
            result: ping(),
          });
          break;
        case "peers.connect":
          const { host, port } = params;
          const connectionResponse = await peerConnect(host, port);
          console.log({ connectionResponse });
          break;
        case "peers.check":
          response = "ok";
          break;
      }

      await socket.write(response);
    } catch (e) {
      console.log(e);
      await socket.write("Invalid JSON");
    }

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
