import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { socketReducer } from "../../redux/reducers/userReducers/userSlice";
import { messageReducer } from "../../redux/reducers/userReducers/messagesSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar";
import MessageForm from "./MessageForm"
import ChatHeader from "./Header";

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
            socket.on('get-message', (msg) => {
                dispatch(messageReducer(msg));
            })
        };
    }, [userStatus, dispatch]);
    useEffect(() => {
        socket.on('get-private', (msg) => {
            if (user.roomName === msg.recipientName || user.roomName === msg.senderName) {
                dispatch(messageReducer(msg));
            }
        })
    }, [user.roomName])

    return (
        <div className="client">
            <Sidebar user={user.user} socket={socket} />
            <div className="chat-container">
                <ChatHeader 
                    roomName={user.roomName} 
                    userList={user.userList}/>
                <MessageContainer 
                    socket={socket} 
                    roomName={user.roomName} />
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