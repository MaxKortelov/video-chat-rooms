import socket from "../../socket"
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {v4} from "uuid";
import ACTIONS from "../../socket/actions";
export default function Main() {
    const history = useHistory()
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
                                history.push(`/room/${roomID}`)
                            }}
                        >JOIN ROOM</button>
                    </li>))}
            </ul>
            <button
                onClick={() => {
                    history.push(`/room/${v4()}`)
                }
            }>Create NEW Room</button>
        </div>
    )
}