import React, { useEffect, useState } from "react"
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setSocket, setRoomId, setRoomName } from "../../redux/actions/userSlice";
import { setMessages, replaceMessages } from "../../redux/actions/messagesSlice";
import { setRoomList } from "../../redux/actions/roomSlice"
import { fetchUser } from "../../redux/thunk/fetchUser";
import ChatContainer from "../../components/Chat/"
import { io } from "socket.io-client";
import { WEB_SOCKET_URL } from '../../constants';

const socket = io(WEB_SOCKET_URL)
function Chat() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rooms = useSelector(state => state.room.roomList);
    const messages = useSelector(state => state.message.messages);;
    const [state, setState] = useState({
        unreadMessages: {},
        addRoomName: '',
        usersList: {},
        message: '',
        error: null,
        user: user.user,
        email: user.email,
        active: false,
        overflow: false
    })
    useEffect(() => {
        socket.on('current-room', (room, roomId) => {
            if (roomId === null) {
                dispatch(setRoomId(room))
            } else {
                dispatch(setRoomId(roomId))
            }
            dispatch(setRoomName(room))
        })
    }, [socket, dispatch]);
    useEffect(() => {
        socket.on('room-joined', data => {
            dispatch(replaceMessages(data));
        })
        socket.on(('initial-rooms'), rooms => {
            rooms.map(room => {
                console.log()
                socket.emit('join-room', {
                    room: room,
                    roomId: room,
                });
            })
            dispatch(setRoomList(rooms));
        });
        socket.on(('room-added'), rooms => {
            rooms.map(room => {
                console.log()
                socket.emit('join-room', {
                    room: room,
                    roomId: room,
                });
            })
            dispatch(setRoomList(rooms));
        });
    }, []);
    useEffect(() => {
        socket.on('users-connected', users => setState(prevState => ({
            ...prevState,
            usersList: users
        })))
        socket.on('users-disconnected', users => setState(prevState => ({
            ...prevState,
            usersList: users
        })))
    }, [state.usersList]);
    useEffect(() => {
        if (user.status === 'idle') {
            dispatch(fetchUser());
        };
        if (user.status === 'succeeded') {
            dispatch(setSocket(socket.id));
        };
    }, [user.status])
    useEffect(() => {
        socket.on('get-message', (msg) => {
            const room = msg.recipientName
            if (room === user.roomName) {
                dispatch(setMessages(msg));
            } else if (state.unreadMessages[room] === undefined) {
                setState(prevState => ({
                    ...prevState,
                    unreadMessages: { [room]: 1 },
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    unreadMessages: { [room]: prevState[room] + 1 },
                }))
            };
        })
        return () => {
            socket.removeAllListeners(['get-message'])
        };
    }, [user.roomName, state.unreadMessages]);
    useEffect(() => {
        if (user.socket) socket.emit('user-log-in', user.user, user.socket);
    }, [user.socket, socket, user.user]);
    useEffect(() => {
        socket.on('get-private', (msg) => {
            const room = msg.recipientName
            if (user.roomName === msg.recipientName || user.roomName === msg.senderName) {
                dispatch(setMessages(msg));
            } else if (state.unreadMessages[room] === undefined) {
                setState(prevState => ({
                    ...prevState,
                    unreadMessages: { [room]: 1 },
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    unreadMessages: { [room]: prevState[room] + 1 },
                }))
            };
        });
        return () => {
            socket.removeAllListeners(['get-message'])
        };
    }, [user.roomName])
    return (
        <ChatContainer
            socket={socket}
            messages={messages}
            message={state.message}
            setState={setState}
            unreadMessages={state.unreadMessages}
            user={user}
            rooms={rooms}
            usersList={state.usersList}
            state={state}
            error={state.error}
        />
    )
}
export default withRouter(Chat)

