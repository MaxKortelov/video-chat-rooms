"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatRoom_1 = require("../models/chatRoom");
const uuid_1 = require("uuid");
function getClientRooms(io) {
    const { rooms } = io.sockets.adapter;
    return Array.from(rooms.keys()).filter(roomID => (0, uuid_1.validate)(roomID) && (0, uuid_1.version)(roomID) === 4);
}
function shareRoomsInfo(io) {
    io.emit(chatRoom_1.ACTIONS.SHARE_ROOMS, {
        rooms: getClientRooms(io)
    });
}
module.exports = { getClientRooms, shareRoomsInfo };
