import React from "react";
import { bold, italic, link, clip, smile, sendMessage } from "../../../stylesheets/icons/icons"

const MessageForm = (props) => {
    const { handleKeyDown, sendData, message, roomName, setMessage } = props;
    return (
        <form id="form" className="client-form">
            <div className="client-form-chats">
                <div className="client-form-chats-top">
                    <textarea
                        placeholder={`Message #${roomName}`}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        type="text"
                        id="textarea"
                        value={message} />
                </div>
                <div className="client-form-chats-bottom">
                    <div className="bottom-left">
                        <img alt="bold" className="buttons-icon" src={bold}  />
                        <img alt="italic" className="buttons-icon" src={italic} />
                        <img alt="link" className="buttons-icon buttons-icon-link" src={link} />
                    </div>
                    <div className="bottom-right">
                        <img alt="clip" className="buttons-icon buttons-icon-clip" src={clip} />
                        <img alt="emoji" className="buttons-icon" src={smile} />
                        <img
                            alt="send"
                            src={sendMessage}
                            onClick={sendData}
                            className="buttons-icon buttons-icon-message" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default MessageForm