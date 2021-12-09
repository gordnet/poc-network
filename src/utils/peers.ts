import http from "http";

const connectToPeer = async (addr: string) => {
  const requestOptions = {
    hostname: addr.split(":")[0],
    port: Number(addr.split(":")[1]),
    method: "POST",
  };

  return new Promise((resolve, reject) => {
    const newRequest = http.request(requestOptions, (res) => {
      res.on("data", console.log);
      res.on("end", resolve);
    });

    newRequest.on("error", reject);
    newRequest.end();
  });
};

export { connectToPeer };
