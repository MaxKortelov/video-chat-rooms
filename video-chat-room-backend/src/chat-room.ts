import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';

import { handleSocketConnection } from "./socketServer/socket"
import {ENVIRONMENT} from "./models/global";

dotenv.config();

const PORT = process.env.PORT;
const IP = process.env.NODE_ENV === ENVIRONMENT.PRODUCTION ? process.env.IP : 'localhost'
console.log(process.env.NODE_ENV, IP)

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

app.listen(PORT, IP,() => {
  console.log(`listening on *:${IP}:${PORT}`);
});