import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux"
import { socketReducer } from "../../redux/reducers/userReducers/userSlice"
import { messageReducer } from "../../redux/reducers/userReducers/messagesSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import "./Chat.css"
import ChatItem from "./ChatListItem";
import ChatList from "./ChatList";
import MessageContainer from "./MessageContainer";

function ChatRender(props) {
    const [message, setMessage] = useState('');
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

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUser());
        }
    }, [userStatus, dispatch]);

    useEffect(() => {
        if (user.socket) socket.emit('user-log-in', user.user, user.socket)
    }, [user.socket, socket, user.user])

    const sendData = () => {
        if (message === '') return;
        socket.emit('message', message, user.user, user.roomId);
        const text = `${user.user}: ${message}`
        dispatch(messageReducer(text))
        setMessage('')
    }

    useEffect(() => {
        if (userStatus === 'succeeded') {
            socket.on('get-message', (message, user, room) => {
                const text = `${user}: ${message}`
                dispatch(messageReducer(text))
            })
            dispatch(socketReducer(socket.id))
        }
    }, [userStatus, socket, dispatch])

    return (
        <div className="chat-wrapper">
            <div className="chat d-flex flex-column">
                <MessageContainer roomName={user.roomName}/>
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
                <div className="chat-list">
                    <ChatItem name='General' socket=""/>
                </div>
                <ChatList socket={socket} />
            </div>
        </div>
    )
}

export default withRouter(ChatRender)