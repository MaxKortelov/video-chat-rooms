import {Server, Socket} from "socket.io";
import {ACTIONS} from "../models/chatRoom";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import { shareRoomsInfo } from './chatRoom.service';
import {version, validate} from 'uuid';

export function handleSocketConnection(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    shareRoomsInfo(io);

    socket.on(ACTIONS.JOIN, config => {
      const {room: roomID} = config;
      const {rooms: joinedRooms} = socket;

      if (Array.from(joinedRooms).includes(roomID)) {
        return console.warn(`Already joined to ${roomID}`);
      }

      const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

      clients.forEach(clientID => {
        io.to(clientID).emit(ACTIONS.ADD_PEER, {
          peerID: socket.id,
          createOffer: false
        });

        socket.emit(ACTIONS.ADD_PEER, {
          peerID: clientID,
          createOffer: true,
        });
      });

      socket.join(roomID);
      shareRoomsInfo(io);
    });

    function leaveRoom() {
    const {rooms} = socket;

    Array.from(rooms)
      // LEAVE ONLY CLIENT CREATED ROOM
      .filter(roomID => validate(roomID) && version(roomID) === 4)
      .forEach(roomID => {

        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        clients
          .forEach(clientID => {
            io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
              peerID: socket.id,
            });

            socket.emit(ACTIONS.REMOVE_PEER, {
              peerID: clientID,
            });
          });

        socket.leave(roomID);
      });

    shareRoomsInfo(io);
  }

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on('disconnecting', leaveRoom);

  socket.on(ACTIONS.RELAY_SDP, ({peerID, sessionDescription}) => {
    io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerID: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.RELAY_ICE, ({peerID, iceCandidate}) => {
    io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
      peerID: socket.id,
      iceCandidate,
    });
  });
}