import socketIo, { ManagerOptions, SocketOptions } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SERVER_URL!;

const socket = (options?: Partial<ManagerOptions & SocketOptions>) => {
  return socketIo(URL, options);
};

export { socket };
