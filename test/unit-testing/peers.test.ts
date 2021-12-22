import { connectToPeer } from "../../src/utils/peers";
import { getPeersCommand } from "../../src/rpcCommands/peers";
jest.mock("../../src/rpcCommands/peers");

describe('Peer connectivity', () => {

  it('should return an error', () => {
    return connectToPeer("test")
      .catch(e => expect(e).toBeTruthy());
  })
});

describe('RPC Commands', () => {
  // const newNode: any = [{
  //   connectedAt: Date.now(),
  //   throughput: 64,
  //   ip: "127.0.0.1",
  //   port: 9001
  // }];
  // it('should add peer command', async () => {
  //   const data = await addPeerCommand(newNode);
  //   expect(data).toEqual(newNode);
  // });
  it('should return expected data', async () => {
    const data = await getPeersCommand();
    expect(data).toBeUndefined();
  });
});