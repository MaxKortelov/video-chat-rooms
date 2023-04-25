import {io} from 'socket.io-client';

const options = {
  "force new connection": true,
  timeout: 10000,
  autoConnect: true,
  transports: ["websocket"]
}

const socket = io(process.env.REACT_APP_SOCKET_URL, options);

export default socket;