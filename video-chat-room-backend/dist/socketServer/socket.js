"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatRoom_1 = require("../models/chatRoom");
const chatRoom_service_1 = require("./chatRoom.service");
const uuid_1 = require("uuid");
function handleSocketConnection(io, socket) {
    (0, chatRoom_service_1.shareRoomsInfo)(io);
    socket.on(chatRoom_1.ACTIONS.JOIN, config => {
        const { room: roomID } = config;
        const { rooms: joinedRooms } = socket;
        if (Array.from(joinedRooms).includes(roomID)) {
            return console.warn(`Already joined to ${roomID}`);
        }
        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
        clients.forEach(clientID => {
            io.to(clientID).emit(chatRoom_1.ACTIONS.ADD_PEER, {
                peerID: socket.id,
                createOffer: false
            });
            socket.emit(chatRoom_1.ACTIONS.ADD_PEER, {
                peerID: clientID,
                createOffer: true,
            });
        });
        socket.join(roomID);
        (0, chatRoom_service_1.shareRoomsInfo)(io);
    });
    function leaveRoom() {
        const { rooms } = socket;
        Array.from(rooms)
            // LEAVE ONLY CLIENT CREATED ROOM
            .filter(roomID => (0, uuid_1.validate)(roomID) && (0, uuid_1.version)(roomID) === 4)
            .forEach(roomID => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
            clients
                .forEach(clientID => {
                io.to(clientID).emit(chatRoom_1.ACTIONS.REMOVE_PEER, {
                    peerID: socket.id,
                });
                socket.emit(chatRoom_1.ACTIONS.REMOVE_PEER, {
                    peerID: clientID,
                });
            });
            socket.leave(roomID);
        });
        (0, chatRoom_service_1.shareRoomsInfo)(io);
    }
    socket.on(chatRoom_1.ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);
    socket.on(chatRoom_1.ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
        io.to(peerID).emit(chatRoom_1.ACTIONS.SESSION_DESCRIPTION, {
            peerID: socket.id,
            sessionDescription,
        });
    });
    socket.on(chatRoom_1.ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
        io.to(peerID).emit(chatRoom_1.ACTIONS.ICE_CANDIDATE, {
            peerID: socket.id,
            iceCandidate,
        });
    });
}
module.exports = { handleSocketConnection };
