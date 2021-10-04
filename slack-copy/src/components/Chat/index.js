import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { socketReducer } from "../../redux/reducers/userReducers/userSlice";
import { messageReducer } from "../../redux/reducers/userReducers/messagesSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import "./Chat.css";
import ChatList from "./ChatList";
import MessageContainer from "./MessageContainer";
import AddRoom from "./AddRoomBtn/index";
import RoomList from "./RoomList";
import DeleteRoom from "./RemoveRoomBtn";

function ChatRender(props) {
    const socket = props.socket;
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const user = useSelector(state => state.user);
    const userStatus = useSelector(state => state.user.status);

    const onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendData();
        };
    };

    useEffect(() => {
        if (userStatus === 'idle') dispatch(fetchUser());
    }, [userStatus, dispatch]);

    useEffect(() => {
        if (user.socket) socket.emit('user-log-in', user.user, user.socket);
    }, [user.socket, socket, user.user]);

    const sendData = () => {
        if (message === '') return;
        console.log(user.roomName, 'Roomname <-, RoomId ->', user.roomId)
        if (user.roomName === user.roomId) {
            socket.emit('message', message, user.user, user.roomName, user.roomId);
        } else {
            console.log(user.socket, 'to', user.sendTo)
            socket.emit('private-message', {
                senderName: user.user,
                recipientName: user.roomName,
                msg: message,
                sender: user.socket,
                recipient: user.sendTo
            })
            const text = `${user.user}: ${message}`;
            dispatch(messageReducer(text));
        }
        setMessage('');
    }


    useEffect(() => {
        if (userStatus === 'succeeded') {
            dispatch(socketReducer(socket.id));
            socket.on('get-message', (message, user) => {
                const text = `${user}: ${message}`;
                dispatch(messageReducer(text));
            })
            socket.on('get-private', ({ msg, senderName, sender, recipient, recipientName }) => {
                const text = `${senderName}: ${msg}`
                console.log(user.roomName, '?=', senderName)
                if (user.roomName === senderName) dispatch(messageReducer(text));
            })
        };
    }, [userStatus, dispatch, user.roomName]);

    return (
        <div className="chat-wrapper">
            <div className="chat d-flex flex-column">
                <MessageContainer socket={socket} roomName={user.roomName} />
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
                <AddRoom socket={socket} />
                <DeleteRoom socket={socket} />
                Rooms:
                <RoomList socket={socket} />
                <ChatList me={user.user} socket={socket} />
            </div>
        </div>
    );
}

export default withRouter(ChatRender);