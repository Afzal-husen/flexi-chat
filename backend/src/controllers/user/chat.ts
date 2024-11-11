import { Request, Response, NextFunction } from "express";
import { io } from "../../index.js";
import { socketEvents } from "../../lib/helpers/socket-events.js";

const privateChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    io.on("connection", (socket) => {
      // joing room
      socket.on(socketEvents.joinRoom, (roomId) => {
        socket.join(roomId);
      });

      //chat message
      socket.on(socketEvents.chatMessage, ({ roomId, message }) => {
        socket.to(roomId).emit(socketEvents.chatMessage, message);
      });

      //disconnect socket
      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });


  } catch (error) {
    next(error);
  }
};

export { privateChat };
