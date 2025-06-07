import dotenv from "dotenv";
import express, { Express } from "express";
import { Server } from "socket.io";
import http from "node:http";
import { socketEvents } from "./lib/helpers/socket-events.js";
import { connectDb } from "./lib/db/connect-db.js";
import userRouter from "./routes/user.js";
import { errorHandler } from "./middleware/error-handler.js";
import cookieParser from "cookie-parser";
import { authenticateSocket } from "./middleware/auth.js";
import { FRONTEND_URL, PORT } from "./lib/config/env.js";

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", userRouter);
app.use(errorHandler);

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// io.use(authenticateSocket);

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);
  socket.on(socketEvents.sendMessage, (message) => {
    socket.broadcast.emit(socketEvents.receiveMessage, {
      id: socket.id,
      message,
    });
  });
});

const start = async () => {
  try {
    await connectDb();
    server.listen(PORT, () => console.log(`server running at port ${PORT}`));
  } catch (error) {}
};
start();
