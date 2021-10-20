import React, { useState, useEffect } from "react";
import { bold, italic, link, clip, smile, sendMessage } from "../../../stylesheets/icons/icons"

const MessageForm = ({ user, roomName, roomId, socket }) => {
    const [message, setMessage] = useState('');
    const [isBold, setBold] = useState(false);
    const [isItalic, setItalic] = useState(false)
    const handleKeyUp = e => {
        const textarea = document.querySelector('textarea');
        textarea.style.height = `auto`
        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`
    }
    const handleKeyDown = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            sendData();
        } else if (e.keyCode === 13 && e.shiftKey) {
            console.log(e.target.value)
        }
    };
    const sendData = () => {
        if (message === '') return;
        if (roomName === roomId) {
            const msg = {
                sender: socket.id,
                senderName: user,
                message: message,
                recipient: roomId,
                recipientName: roomName
            }
            socket.emit('message', msg);
        } else {
            const msg = {
                senderName: user,
                recipientName: roomName,
                message: message,
                sender: socket.id,
                recipient: roomId
            }
            socket.emit('private-message', msg)
        }
        setMessage('');
    };
    const handleBold = e => {
        const target = document.getElementById("textarea");
        if (target.style.fontWeight === "normal") {
            target.style.fontWeight = "bolder"
            e.target.style.background = "grey"
        } else {
            target.style.fontWeight = "normal"
            e.target.style.background = "white"
        }
        setBold(!isBold)
    }
    const handleItalic = e => {
        const target = document.getElementById("textarea");
        if (target.style.fontStyle === "normal") {
            target.style.fontStyle = "italic"
            e.target.style.background = "grey"
        } else {
            target.style.fontStyle = "normal"
            e.target.style.background = "white"
        }
        setItalic(!isItalic)
    }
    useEffect(() => {
        const textarea = document.querySelector('textarea');
        textarea.addEventListener("keyup", handleKeyUp)
        return () => textarea.removeEventListener("keyup", handleKeyUp)
    })
    return (
        <form id="form" className="client-form">
            <div className="client-form-chats">
                <div className="client-form-chats-top">
                    <textarea
                        style={{ fontWeight: "normal" , fontStyle: "normal"}}
                        placeholder={`Message #${roomName}`}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        type="text"
                        id="textarea"
                        value={message} />
                </div>
                <div className="client-form-chats-bottom">
                    <div className="bottom-left">
                        <img alt="bold" className="buttons-icon" src={bold} onClick={handleBold} />
                        <img alt="italic" className="buttons-icon" src={italic} onClick={handleItalic}/>
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