/// <reference path="types/global.d.ts" />

import http from "http";
import https from "https";
import { program } from "commander";
import startJsonRpcService from "./servers/jsonRpcServer";
import startNetworkServer from "./servers/networkServer";
import Db from "./config/db";

program
  .description("A node in the network")
  .option("-p, --port <port>", "Port to listen to", "10309")
  .option(
    "-r, --rpcport <port>",
    "Port to listen to for JSON RPC. If none is specified, then the RPC server will not run"
  );

program.parse();

const options = program.opts();
const PORT = Number(options.port);
const RPCPORT = Number(options.rpcport);

Db.init(PORT);

const requestHandler = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  if (request.headers["content-type"] !== "application/json") {
    return response.writeHead(400).end("Invalid content-type");
  }

  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    let requestData: any = {};
    try {
      requestData = JSON.parse(data);
    } catch (e) {
      return response.writeHead(400).end("Invalid JSON");
    }

    const [protocol, urlPath] = requestData.destination.split("://");

    const requestOptions: any = {
      hostname: urlPath.split("/")[0],
      port: protocol === "https" ? 443 : 80,
      path: urlPath.split("/").slice(1).join("/"),
      method: "GET",
    };

    let destinationData = "";

    if (requestData.nodes?.length > 0) {
      // We need to forward this request to another node
      const destination = requestData.nodes[0];

      destinationData = JSON.stringify({
        destination: requestData.destination,
        nodes: requestData.nodes.slice(1),
      });

      requestOptions.hostname = destination.split(":")[0];
      requestOptions.port = destination.split(":")[1];
      delete requestOptions.path;
      requestOptions.method = "POST";
      requestOptions.headers = {
        "Content-Type": "application/json",
        "Content-Length": destinationData.length,
      };
    }

    const httpLibrary = requestOptions.port === 443 ? https : http;

    console.log({ requestOptions });

    const newRequest = httpLibrary.request(requestOptions, async (res) => {
      res.on("data", (d) => {
        response.write(d);
      });

      res.on("end", () => {
        response.end();
      });
    });

    newRequest.on("error", (error) => {
      console.log({ error });
      return response.writeHead(500).end(error.message);
    });

    if (destinationData?.length > 0) {
      console.log({ destinationData });
      newRequest.write(destinationData);
    }

    newRequest.end();
  });
};

const startService = async () => {
  const server = http.createServer(requestHandler);

  console.log("Listening on port " + global.PORT);
  return server.listen(global.PORT);
};

// startService()
startNetworkServer(PORT);
if (RPCPORT) {
  startJsonRpcService(RPCPORT);
}
