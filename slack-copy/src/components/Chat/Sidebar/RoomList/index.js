import React from "react"
import RoomItem from "./RoomListItem";
const RoomList = (props) => {
    const {handleRoomClick, active, socket, rooms} = props
    return (
        <div className="chat-panel-list">
            <RoomItem name='general' active={active} socket={socket} />
            {Object.keys(rooms).map(key => {
                return (
                    <RoomItem
                        handleRoomClick={handleRoomClick}
                        active={active}
                        name={rooms[key]}
                        key={[key]}
                        socketId={socket}
                    />
                );
            })}
        </div>
    );
};

export default RoomList;