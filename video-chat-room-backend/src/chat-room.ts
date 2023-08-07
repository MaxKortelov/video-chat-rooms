import express, {Express} from 'express';
import { Server } from "socket.io";
import dotenv from 'dotenv';

import { handleSocketConnection } from "./socketServer/socket"
import * as fs from "fs";
import { ENVIRONMENT} from "./models/global";
import path from "path";
// import * as https from "https";
import * as http from "http";

dotenv.config();

const app: Express = express();

export const PORT = process.env.PORT;
export const ENV = process.env.NODE_ENV;

let options: any = {};
if(ENV === ENVIRONMENT.PRODUCTION) {
    options.key = fs.readFileSync(path.join(__dirname, '..', 'certificate', 'private.key'));
    options.cert = fs.readFileSync(path.join(__dirname, '..', 'certificate', 'certificate.crt'));
};

// const server = ENV === ENVIRONMENT.PRODUCTION ? https.createServer(options, app) : http.createServer(app);
const server = http.createServer(app)
const io = new Server(server);

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.send('<h1>Server is working</h1>');
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  handleSocketConnection(io, socket);
});

app.listen(PORT,() => {
  console.log(`listening on *:${PORT}`);
});