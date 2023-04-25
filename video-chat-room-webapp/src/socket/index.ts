import {io} from 'socket.io-client';

const options = {
  "force new connection": true,
  timeout: 10000,
  autoConnect: true,
  transports: ["websocket"]
}

const socket = io("http://localhost:9010", options);

export default socket;