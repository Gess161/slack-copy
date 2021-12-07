import React from "react";
import ChatItem from "./ChatListItem/";

const ChatPanelList = (props) => {
    const { socket, usersList, user, handleRoomClick, unreadMessages } = props;
    return (
        <div className="channels">
            <p>Direct Messages</p>
            {Object.keys(usersList).map(key => {
                if (key !== user.user) {
                    return (
                        <ChatItem
                            unreadMessages={unreadMessages}
                            handleRoomClick={handleRoomClick}
                            active={user.roomName}
                            name={key}
                            key={usersList[key]}
                            socket={socket}
                            socketId={usersList[key]}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default ChatPanelList