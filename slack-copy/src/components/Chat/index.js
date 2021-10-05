import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { socketReducer } from "../../redux/reducers/userReducers/userSlice";
import { messageReducer } from "../../redux/reducers/userReducers/messagesSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import ChatList from "./ChatList";
import MessageContainer from "./MessageContainer";
import RoomList from "./RoomList";
import AddRoom from "./AddRoomBtn/index";
import DeleteRoom from "./RemoveRoomBtn";
import icon from "../../stylesheets/icons/bell.svg"
import search from "../../stylesheets/icons/search.svg"
import appIcon from "../../stylesheets/icons/app.svg"
import usersNumber from "../../stylesheets/icons/chat-user.png"

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
    const sendData = () => {
        if (message === '') return;
        if (user.roomName === user.roomId) {
            socket.emit('message', message, user.user, user.roomName, user.roomId);
        } else {
            socket.emit('private-message', {
                senderName: user.user,
                recipientName: user.roomName,
                msg: message,
                sender: user.socket,
                recipient: user.roomId
            })
            const text = `${user.user}: ${message}`;
            dispatch(messageReducer(text));
        }
        setMessage('');
    };
    useEffect(() => {
        if (userStatus === 'idle') dispatch(fetchUser());
    }, [userStatus, dispatch]);
    useEffect(() => {
        if (user.socket) socket.emit('user-log-in', user.user, user.socket);
    }, [user.socket, socket, user.user]);
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
        <div className="chat">
            <div className="chat-panel">
                <h2 className="chat-panel-header ">
                    <div className="header">
                        <div className="header-top">
                            <div className="header-text-name">Hlack Mockup</div>
                            <div className="chat-panel-arrow"></div>
                        </div>
                        <div className="header-bottom">
                            <div className="online-indicator"></div>
                            <div className="header-bottom-user">{user.user}</div>
                        </div>
                    </div>
                    <img src={icon} className="chat-panel-bell" />
                </h2>
                <div className="jump-to">
                    <img className="search" src={search} />
                    <input placeholder="Jump to..." />
                </div>
                <div className="apps">
                    <img className="icon" src={appIcon} />
                    <p>Apps</p>
                </div>
                {/* <AddRoom socket={socket} />
                <DeleteRoom socket={socket} /> */}
                <div className="channels">
                    <p>Channels</p>
                    <AddRoom socket={socket} />
                </div>
                <RoomList socket={socket} />
                <ChatList me={user.user} socket={socket} />
            </div>
            <div className="message-container">
                <div className="message-header">
                    <div className="message-header-left">
                        <div className="message-header-left-text">#{user.roomName}</div>
                        <div className="status">
                            <img className="status-icon" src={usersNumber} />
                            <div className="status-users">{3}</div>
                        </div>
                    </div>
                    <div className="message-header-right">
                        <div className="buttons-left">
                            <img className="button-icon"/>
                            <img className="button-icon"/>
                            <img className="button-icon"/>
                        </div>
                        <div className="message-search">
                            <img className="button-icon"/>
                            <input className="message-search-input" />
                        </div>
                        <div className="buttons-right">
                            <img className="button-icon"/>
                            <img className="button-icon"/>
                            <img className="button-icon"/>
                        </div>
                    </div>
                </div>
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
        </div>
    );
}

export default withRouter(ChatRender);