import React from "react"
import userPicture from "../../../../../stylesheets/icons/user.png"

const ChatItem = (props) => {
    const { handleRoomClick, name, active, socketId } = props;
    const style = name === active ? { opacity: 1, fontWeight: 700, color: 'white' } : { opacity: 0.8 }
    return (
        <div className="chat-item">
            <img className="icon" alt="user" src={userPicture} />
            <div className="chat-item" style={style} socketid={socketId} onClick={handleRoomClick} >{name}</div>
        </div>
    )
}

export default ChatItem