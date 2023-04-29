"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./socketServer/socket");
const fs = __importStar(require("fs"));
const https = __importStar(require("https"));
const global_1 = require("./models/global");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.PORT = process.env.PORT;
exports.ENV = process.env.NODE_ENV;
const options = exports.ENV === global_1.ENVIRONMENT.PRODUCTION ? {
    key: fs.readFileSync('/etc/ssl/private/private.key'),
    cert: fs.readFileSync('/etc/ssl/certificate.crt'),
} : {};
const server = https.createServer(options, app);
const io = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    res.send('<h1>Server is working</h1>');
});
io.on('connection', (socket) => {
    console.log('a user connected');
    (0, socket_1.handleSocketConnection)(io, socket);
});
app.listen(exports.PORT, () => {
    console.log(`listening on *:${exports.PORT}`);
});
