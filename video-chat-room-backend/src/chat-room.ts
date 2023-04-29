import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';

import { handleSocketConnection } from "./socketServer/socket"
import * as fs from "fs";
import * as https from "https";
import {ENV, ENVIRONMENT, PORT} from "./models/global";

dotenv.config();

const app = express();

export const PORT = process.env.PORT;
export const ENV = process.env.NODE_ENV;

const options = ENV === ENVIRONMENT.PRODUCTION ? {
  key: fs.readFileSync('/etc/ssl/private/private.key'),
  cert: fs.readFileSync('/etc/ssl/certificate.crt'),
} : {};

const server = https.createServer(options, app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Server is working</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  handleSocketConnection(io, socket);
});

app.listen(PORT,() => {
  console.log(`listening on *:${PORT}`);
});