import express, {Express, Request, Response} from 'express';
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


app.use(express.static(path.join(__dirname, 'views')));
app.use("/room/:id", express.static(path.join(__dirname, 'views')));

app.use(function (req, res, next) {
  var filename = path.basename(req.url);
  var extension = path.extname(filename);
  if (extension === '.css' || extension === '.js' || extension === '.json')
      console.log("The file " + filename + " was requested.", path);
  next();
});

export const PORT = process.env.PORT;

server.listen(PORT,() => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket: Socket) => { 
  console.log('a user connected');
  handleSocketConnection(io, socket);
});