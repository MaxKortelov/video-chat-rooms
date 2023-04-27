import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';

import { handleSocketConnection } from "./socketServer/socket"

dotenv.config();

const PORT = process.env.PORT;
const IP = process.env.IP

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  console.log("req")
  res.send('<h1>Server is working</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  handleSocketConnection(io, socket);
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});