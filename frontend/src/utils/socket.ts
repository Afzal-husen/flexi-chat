import socketIo from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SERVER_URL!;

export const socket = socketIo(URL, { autoConnect: false });
