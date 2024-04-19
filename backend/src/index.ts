import dotenv from "dotenv";
import express, { Express } from "express";
import { Server } from "socket.io";
import http from "node:http";

dotenv.config();
const app: Express = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);
});

server.listen(5000, () => console.log("server running at port 5000"));
