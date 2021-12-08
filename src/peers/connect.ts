import net from "net";

const peerConnect = async (host: string, port: number) => {
  const socket = net.connect(port, host);
  return new Promise<net.Socket>((resolve, reject) => {
    socket.on("connect", async () => {
      console.log(`Connected to ${host}:${port}`);
      await socket.write(
        JSON.stringify({
          method: "peers.check",
          params: {
            data: Buffer.alloc(10 * 1024).toString("base64"),
          },
        })
      );
      socket.end();
      resolve(socket);
    });
    socket.on("error", reject);
  });
};

export { peerConnect };
