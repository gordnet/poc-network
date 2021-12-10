import levelup, { LevelUp } from "levelup";
import leveldown from "leveldown";

class Db {
  PORT: number;
  peerDb?: LevelUp;

  constructor() {
    this.PORT = 10309;
  }
  init(port: number) {
    console.log("init db", port);
    this.PORT = port;
    this.peerDb = levelup(
      leveldown(`${process.cwd()}/data/peers.${this.PORT}`)
    );
  }
}
export default new Db();
