import socket from "../../socket"
import React, {useEffect, useState} from "react";
import {v4} from "uuid";
import {ACTIONS} from "../../models/chatRoom";
import {useNavigate} from "react-router-dom";

export default function Main(): React.ReactElement {
  const navigate = useNavigate()
  const [rooms, updateRooms] = useState([]);

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
      updateRooms(rooms);
    });
  }, []);

  return (
    <div>
      <h1>Available rooms</h1>
      <ul>
        {rooms.map(roomID => (
          <li key={roomID}>
            {roomID}
            <button
              onClick={() => {
                navigate(`/room/${roomID}`)
              }}
            >JOIN ROOM</button>
          </li>))}
      </ul>
      <button
        onClick={() => {
          navigate(`/room/${v4()}`)
        }
        }>Create NEW Room</button>
    </div>
  )
}