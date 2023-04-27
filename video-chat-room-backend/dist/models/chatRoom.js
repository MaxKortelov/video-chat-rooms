"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIONS = void 0;
var ACTIONS;
(function (ACTIONS) {
    ACTIONS["JOIN"] = "join";
    ACTIONS["LEAVE"] = "leave";
    ACTIONS["SHARE_ROOMS"] = "share-rooms";
    ACTIONS["ADD_PEER"] = "add-peer";
    ACTIONS["REMOVE_PEER"] = "remove-peer";
    ACTIONS["RELAY_ICE"] = "relay-ice";
    ACTIONS["RELAY_SDP"] = "relay-sdp";
    ACTIONS["ICE_CANDIDATE"] = "ice-candidate";
    ACTIONS["SESSION_DESCRIPTION"] = "session-description";
})(ACTIONS = exports.ACTIONS || (exports.ACTIONS = {}));
