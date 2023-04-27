import {ACTIONS} from "../models/chatRoom";
import {version, validate} from 'uuid';
import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

function getClientRooms(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
  const {rooms} = io.sockets.adapter;

  return Array.from(rooms.keys()).filter(roomID => validate(roomID) && version(roomID) === 4);
}

export function shareRoomsInfo(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
  io.emit(ACTIONS.SHARE_ROOMS, {
    rooms: getClientRooms(io)
  })
}
