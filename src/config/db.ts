import levelup, { LevelUp } from "levelup";
import leveldown, { LevelDown } from "leveldown";

class Db {
  PORT: number;
  peerDb?: LevelUp;

  constructor() {
    this.PORT = 10309;
  }
  init(port: number) {
    this.PORT = port;
    this.peerDb = levelup(
      leveldown(`${process.cwd()}/data/peers.${this.PORT}`)
    );
  }
}
export default new Db();
