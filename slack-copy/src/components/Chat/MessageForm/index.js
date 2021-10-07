import { useState } from "react";
import { useDispatch } from "react-redux";
import { messageReducer } from "../../../redux/reducers/userReducers/messagesSlice";
import { bold, italic, link, clip, smile, sendMessage } from "../../../stylesheets/icons/icons"


const MessageForm = ({ user, roomName, roomId, socket }) => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendData();
        };
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
            // dispatch(messageReducer(msg));
            console.log(1)
        } else {
            const msg = {
                senderName: user,
                recipientName: roomName,
                message: message,
                sender: socket.id,
                recipient: roomId
            }
            socket.emit('private-message', msg)
            console.log(msg)
        }
        setMessage('');
    };
    return (
        <form id="form" className="client-form">
            <div className="client-form-chats">
                <div className="client-form-chats-top">
                    <input
                        placeholder={`Message #${roomName}`}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={onKeyDownHandler}
                        type="text"
                        id="message"
                        value={message} />
                </div>
                <div className="client-form-chats-bottom">
                    <div className="bottom-left">
                        <img alt="bold" className="buttons-icon" src={bold} />
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