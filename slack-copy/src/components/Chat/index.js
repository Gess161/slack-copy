import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux"
import { fetchUser, userReducer } from "../../redux/reducers/userReducer/userSlice"
import "./Chat.css"
import ChatItem from "./ChatListItem";
import addSocket from "../../redux/actions/addSocket";



function ChatRender(props) {
    const [message, setMessage] = useState('');
    const user = useSelector(state => state.user);
    const userStatus = useSelector(state => state.user.status);
    const dispatch = useDispatch();

    const sendData = () => {
        if (message === '') return;
        props.socket.emit('message', message, user.user);
        setMessage('')
    }

    const appendMessage = async (message, user) => {
        const messageContainer = document.getElementById('message-container');
        const messageElement = document.createElement('div');
        messageElement.innerText = `${user}: ${message}`;
        messageContainer.append(messageElement);
    }

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUser());
        }
    }, [userStatus, dispatch]);


    useEffect(() => {
        if (userStatus === 'succeeded')
            props.socket.on('get-message', (message, user, socket) => {
                appendMessage(message, user);
                console.log(socket)
            })
    }, [userStatus, props.socket])


    const onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            sendData()
        }
    };
    return (
        <div className="chat-wrapper">
            <div className="chat d-flex flex-column">
                <div id="message-container"></div>
                <form id="form" className="chat-form flex-column border border-dark">
                    <div className="message-row d-flex flex-row">
                        <label
                            className="p-2"
                            style={{ width: 100 }}
                            htmlFor="message"> Message </label>
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={onKeyDownHandler}
                            className="w-50 m-2"
                            type="text"
                            id="message"
                            value={message} />
                        <button
                            onClick={sendData}
                            className="w-50 m-2"
                            type="button"
                            id="send-button">Send</button>
                    </div>
                    <div className="d-flex p-2 flex-row">
                        You logged in as: {user.user}
                    </div>
                </form>
            </div>
            <div className="chat-panel">
            List of rooms and users
                <button>Add Room</button>
                <div className="chat-panel-list">
                    <ChatItem name='Current room' />
                    <ChatItem name='General' />
                </div>
                <div className="chat-panel-list">
                    <ChatItem name='Some user' />
                </div>
            </div>
        </div>
    )
}

export default withRouter(ChatRender)