"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./socketServer/socket");
dotenv_1.default.config();
const PORT = process.env.PORT;
const IP = process.env.IP;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    res.send('<h1>Server is working</h1>');
});
io.on('connection', (socket) => {
    console.log('a user connected');
    (0, socket_1.handleSocketConnection)(io, socket);
});
server.listen(PORT, IP, () => {
    console.log(`listening on *:${PORT}`);
});
