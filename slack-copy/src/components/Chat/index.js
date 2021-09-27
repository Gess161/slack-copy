import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux"
import { socketReducer } from "../../redux/reducers/userReducers/userSlice"
import { messageReducer } from "../../redux/reducers/userReducers/messagesSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import "./Chat.css"
import ChatItem from "./ChatListItem";
import ChatPanelList from "./ChatPanelList";
import MessageContainer from "./MessageContainer";

function ChatRender(props) {
    const [message, setMessage] = useState('');
    const messagesList = useSelector(state => state.message)
    const user = useSelector(state => state.user);
    const userStatus = useSelector(state => state.user.status);
    const dispatch = useDispatch();
    const socket = props.socket

    const onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            sendData()  
        }
    };

    const sendData = () => {
        if (message === '') return;
        socket.emit('message', message, user.user, user.roomId);
        const text = `${user.user}: ${message}`
        console.log(text)
        dispatch(messageReducer(text))
        setMessage('')
    }

    const appendMessage = (message, user, room) => {
        // const messageContainer = document.getElementById('message-container');
        // const messageElement = document.createElement('div');
        // messageElement.innerText = `${user}: ${message}`;
        // messageContainer.append(messageElement);
    }

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUser());
        }
    }, [userStatus, dispatch]);

    useEffect(() => {
        if (user.socket) socket.emit('user-log-in', user.user, user.socket)
    }, [user.socket, socket, user.user])

    useEffect(() => {
        if (userStatus === 'succeeded') {
            socket.on('get-message', (message, user, room) => {
                appendMessage(message, user, room);
            })
            dispatch(socketReducer(socket.id))
        }
    }, [userStatus, socket, dispatch])

    return (
        <div className="chat-wrapper">
            <div className="chat d-flex flex-column">
                <MessageContainer>
                    <div className="current-room">Room: {user.roomName}</div>
                </MessageContainer>
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
                Rooms
                <div className="chat-panel-list">
                    <ChatItem name='General' socket=""/>
                </div>
                <ChatPanelList socket={socket} />
            </div>
        </div>
    )
}

export default withRouter(ChatRender)