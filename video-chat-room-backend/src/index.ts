import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from "socket.io";
import { manageIO } from './socketServer/socket';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

manageIO(io);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Server is up');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at PORT ${port}`);
});