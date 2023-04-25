import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';

import { handleSocketConnection } from "./socketServer/socket"

dotenv.config();

const port = process.env.PORT;

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
  handleSocketConnection(io, socket);
});

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at PORT ${port}`);
});