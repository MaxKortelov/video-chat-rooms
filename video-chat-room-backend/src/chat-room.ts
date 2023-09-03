import express, {Express} from 'express';
import { Server, Socket } from "socket.io";
import dotenv from 'dotenv';
import { handleSocketConnection } from "./socketServer/socket"
import path from "path";
import {createServer} from "http";
// import { ENVIRONMENT } from './models/global';

dotenv.config();

const app: Express = express();
const server = createServer(app);
const io = new Server(server);


// app.use(express.static('public'));

export const PORT = process.env.PORT;
// export const ENV = process.env.NODE_ENV;
// const isProd = ENV === ENVIRONMENT.PRODUCTION;

// if(isProd) {
  // app.get('/', function (request, response) {
  //   response.sendFile(path.resolve('public/index.html'));
  // });
// }

app.get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'views/index.html'));
});

app.get('/room/:id', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'views/index.html'));
});

server.listen(PORT,() => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket: Socket) => { 
  console.log('a user connected');
  handleSocketConnection(io, socket);
});