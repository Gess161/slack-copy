import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { socketReducer } from "../../redux/reducers/userReducers/userSlice";
import { messageReducer } from "../../redux/reducers/userReducers/messagesSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import MessageContainer from "./MessageContainer";
import { at, chatSearch, chatUser, info, overflow, phone, settings, star } from "../../stylesheets/icons/icons"
import Sidebar from "./Sidebar";
import MessageForm from "./MessageForm"

function ChatRender(props) {
    const socket = props.socket;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const userStatus = useSelector(state => state.user.status);

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
        <div className="client">
            <Sidebar user={user.user} socket={socket} />
            <div className="chat-container">
                <div className="chat-header">
                    <div className="chat-header-left">
                        <div className="chat-header-left-text">#{user.roomName}</div>
                        <div className="status">
                            <img alt="icon" className="status-icon" src={chatUser} />
                            <div className="status-users">{user.userList.length}</div>
                        </div>
                    </div>
                    <div className="chat-header-right">
                        <div className="buttons-left">
                            <img src={phone} alt="icon" className="buttons-icon" />
                            <img src={info} alt="icon" className="buttons-icon" />
                            <img src={settings} alt="icon" className="buttons-icon" />
                        </div>
                        <div className="chat-search">
                            <img alt="icon" src={chatSearch} className="buttons-icon buttons-icon-search" />
                            <input placeholder="Search" className="chat-search-input" />
                        </div>
                        <div className="buttons-right">
                            <img src={at} alt="icon" className="buttons-icon" />
                            <img src={star} alt="icon" className="buttons-icon" />
                            <img src={overflow} alt="icon" className="buttons-icon" />
                        </div>
                    </div>
                </div>
                <MessageContainer socket={socket} roomName={user.roomName} />
                <MessageForm
                    user={user.user} 
                    socket={socket}
                    roomName={user.roomName} 
                    roomId={user.roomId} />
            </div>
        </div>
    );
}

export default withRouter(ChatRender);