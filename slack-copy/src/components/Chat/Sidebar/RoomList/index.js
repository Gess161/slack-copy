import React from "react"
import RoomItem from "./RoomListItem";
const RoomList = (props) => {
    const { unreadMessages, handleRoomClick, activeChat, socket, rooms } = props;
    console.log(props)
    return (
        <div className="chat-panel-list">
            <RoomItem name='general' unreadMessages={unreadMessages} handleRoomClick={handleRoomClick} active={activeChat} socket={socket} />
            {Object.keys(rooms).map(key => {
                return (
                    <RoomItem
                        unreadMessages={unreadMessages}
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