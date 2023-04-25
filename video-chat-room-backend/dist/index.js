"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./socketServer/socket");
dotenv_1.default.config();
const port = process.env.PORT;
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
// options
});
io.on("connection", (socket) => {
    (0, socket_1.handleSocketConnection)(io, socket);
});
httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at PORT ${port}`);
});
