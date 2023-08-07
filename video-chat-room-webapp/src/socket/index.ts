import {io} from 'socket.io-client';

const options = {
  "force new connection": true,
  timeout: 10000,
  autoConnect: true,
  transports: ["websocket"]
}

const url = process.env.NODE_ENV === "development" ? process.env.REACT_APP_SOCKET_URL : window.location.origin;

const socket = io(url, options);

export default socket;