import React from "react"
import RoomItem from "./RoomListItem";
const RoomList = (props) => {
    const { handleRoomClick, activeChat, socket, rooms } = props;
    return (
        <div className="chat-panel-list">
            <RoomItem name='general' handleRoomClick={handleRoomClick} active={activeChat} socket={socket} />
            {Object.keys(rooms).map(key => {
                return (
                    <RoomItem
                        handleRoomClick={handleRoomClick}
                        active={activeChat}
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