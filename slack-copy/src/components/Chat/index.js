import Sidebar from "./Sidebar"
import Header from "./Header"
import MessageContainer from "./MessageContainer"
import MessageForm from "./MessageForm"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"

import { setSocket, setRoomId, setRoomName } from "../../redux/actions/userSlice";
import { setMessages, replaceMessages } from "../../redux/actions/messagesSlice";
import { setRoomList } from "../../redux/actions/roomSlice"
import { fetchUser } from "../../redux/thunk/fetchUser";


export default function ChatContainer (props){
    const socket = props.socket
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

    const sendData = () => {
        if (state.message === '') return;
        if (user.roomName === user.roomId) {
            const msg = {
                image: user.image,
                sender: socket.id,
                senderName: user.user,
                message: state.message,
                recipient: user.roomId,
                recipientName: user.roomName
            }
            socket.emit('message', msg);
        } else {
            const msg = {
                image: user.image,
                senderName: user.user,
                recipientName: user.roomName,
                message: state.message,
                sender: socket.id,
                recipient: user.roomId
            }
            socket.emit('private-message', msg)
        }
        setState(prevState => ({
            ...prevState,
            message: "",
        }));;
    };

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
        }
    };
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
    useEffect(() => {
        const textarea = document.querySelector('textarea');
        textarea.addEventListener("keyup", handleKeyUp)
        return () => textarea.removeEventListener("keyup", handleKeyUp)
    })

    return (
        <div className="client">
        <Sidebar
            socket={socket}
            state={state}
            unreadMessages={state.unreadMessages}
            user={user}
            rooms={rooms}
            usersList={state.usersList}
            addRoomActive={state.active}
            setState={setState}
        />
        <div className="chat-container">
            <Header
                setState={setState}
                user={user}
                roomName={user.roomName}
                userList={state.usersList}
                state={state}
                error={state.error}
            />
            <MessageContainer
                messages={messages}
            />
            <MessageForm
                message={state.message}
                roomName={user.roomName}
                setState={setState}
                handleKeyDown={handleKeyDown}
                handleKeyUp={handleKeyUp}
                sendData={sendData}
            />
        </div>
    </div>
    )
}