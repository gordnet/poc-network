import net from "net";

const peerConnect = async (host: string, port: number) => {
  const socket = net.connect(port, host);

  const payload = Buffer.alloc(10 * 1024 * 1024);

  const timings: any = {
    startAt: process.hrtime.bigint(),
    endAt: undefined,
    payloadSize: payload.buffer.byteLength,
  };

  return new Promise((resolve, reject) => {
    socket.on("connect", async () => {
      console.log(`Connected to ${host}:${port}`);

      await socket.write(
        JSON.stringify({
          method: "peers.check",
          params: {
            data: payload,
          },
        })
      );
      socket.end();
    });

    socket.on("data", (data) => {
      timings.endAt = process.hrtime.bigint();
      const durationSec = Number(timings.endAt - timings.startAt) / 1000000000;

      const resp = {
        payloadSizeMb: timings.payloadSize / (1024 * 1024),
        throughputMbps: timings.payloadSize / 1000000 / durationSec,
        durationSec,
      };
      resolve(resp);
    });
    socket.on("error", reject);
  });
};

export { peerConnect };
