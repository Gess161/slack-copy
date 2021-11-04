import React from "react"
import { API_BASE_URL } from "../../../constants";

const Message = ({ message }) => {
    const time = message.time.slice(11, 16)
    const image = API_BASE_URL + "/" + message.image
    return (
        <div className="message-container" >
            <img alt='userPicture' src={image} />
            <div className="message">
                <h2 className="username">{message.senderName}<span>{time}</span></h2>
                <p className="message-text" >{message.message}</p>
            </div>
        </div>
    );
};

export default Message;