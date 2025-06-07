import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { RequestError } from "../lib/helpers/errors/request-error.js";

const authenticateSocket = () => (socket: Socket, next: NextFunction) => {
  const token = socket.handshake.auth.token;
  console.log(token);

  if (!token)
    return next(new RequestError({ code: 404, message: "Not authorized" }));

  const decoded = jwt.verify(token, process.env.SESSION_SECRET);

  const { userId } = decoded as { userId: string };

  socket.data.userId = userId;

  next();
};

export { authenticateSocket };
