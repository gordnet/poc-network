export type Peer = {
  connectedAt?: number; // EPOCH TIME
  heartbeatAt?: number; // EPOCH TIME
  throughputMbps?: number;
  host: string;
  port: number;
};
