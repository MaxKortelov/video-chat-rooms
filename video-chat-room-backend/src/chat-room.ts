import express, {Express} from 'express';
import {createServer, ServerOptions} from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';

import { handleSocketConnection } from "./socketServer/socket"
import * as fs from "fs";
import { ENVIRONMENT} from "./models/global";

dotenv.config();

const app: Express = express();

export const PORT = process.env.PORT;
export const ENV = process.env.NODE_ENV;

let options: any = {};
if(ENV === ENVIRONMENT.PRODUCTION) {
    options.key = fs.readFileSync('/etc/ssl/private/private.key');
    options.cert = fs.readFileSync('/etc/ssl/certificate.crt');
};

const server = ENV === ENVIRONMENT.PRODUCTION ? createServer(options, app) : createServer(app);
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