import React from "react"
import userPicture from "../../../../../stylesheets/icons/user.png"
import Counter from "../../MessageCounter";

const ChatItem = (props) => {
    const { handleRoomClick, name, active, socketId, unreadMessages } = props;
    const style = name === active ? { opacity: 1, fontWeight: 700, color: 'white' } : { opacity: 0.8 }
    return (
        <div className="chat-item">
            <img className="icon" alt="user" src={userPicture} />
            <div className="chat-item" style={style} socketid={socketId} onClick={handleRoomClick} >{name}</div>
            <Counter unreadMessages={unreadMessages} name={name} />
        </div>
    )
}

export default ChatItem