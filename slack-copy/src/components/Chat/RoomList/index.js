import { useEffect, useState } from "react";
import RoomItem from "./RoomListItem";

const RoomList = (props) => {
    const socket = props.socket
    const [roomsList , setRoomsList] = useState([])
    
    useEffect(() => {
        socket.on('room-added', rooms => setRoomsList(rooms))
        socket.on('users-connected', (user , rooms) => setRoomsList(rooms));
    }, [roomsList, socket])

    return (
        <div className="chat-panel-list">
            {Object.keys(roomsList).map(key => {
                return (
                    <RoomItem
                        name={roomsList[key]}
                        key={[key]}
                        socket={socket}
                        />
                )
            })}
        </div>
    )
}

export default RoomList;