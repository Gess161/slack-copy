import Sidebar from "./Sidebar"
import Header from "./Header"
import MessageContainer from "./MessageContainer"
import MessageForm from "./MessageForm"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSocket } from "../../redux/actions/userSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import SocketService from "../../services/api/socket/socketService"
import { setRoomList } from "../../redux/actions/roomSlice";
import { setRoomId, setRoomName } from "../../redux/actions/userSlice";
import { replaceMessages, setMessages } from "../../redux/actions/messagesSlice";

export default function ChatContainer() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rooms = useSelector(state => state.room.roomList);
    const messages = useSelector(state => state.message.messages);
    const [state, setState] = useState({
        unreadMessages: {},
        addRoomName: '',
        usersList: {},
        message: '',
        error: null,
        user: user.user,
        email: user.email,
        active: false,
        modal: false
    })

    const chatCallbacks = {
        initialRooms: (rooms) => {
            dispatch(setRoomList(rooms));
        },
        currentRoom: ({ room, roomId }) => {
            if (roomId === null) {
                dispatch(setRoomId(room))
            } else {
                dispatch(setRoomId(roomId))
            }
            dispatch(setRoomName(room))
        },
        roomJoined: data => {
            dispatch(replaceMessages(data));
        },
        roomAdded: rooms => {
            rooms.map(room => {
                
            })
            dispatch(setRoomList(rooms));
        },
        usersConnected: users => setState(prevState => ({
            ...prevState,
            usersList: users
        })),
        usersDisconnected: users => setState(prevState => ({
            ...prevState,
            usersList: users
        })),
        getMessage: (msg) => {
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
        },
        getPrivate: (msg) => {
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
        }
    };
    const Service = new SocketService(chatCallbacks);
    const socket = Service.socket

    const sendData = () => {
        if (state.message === '') return;
        Service.sendMessage(user, state)
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
        if (socket.connected) {
            socket.emit('user-log-in', user.user, user.socket);
        }
        Service.addListener(socket)
        return () => {
            socket.removeAllListeners()
        };
    }, [socket.connected, user.roomId])
    useEffect(() => {
        if (user.status === 'idle') {
            dispatch(fetchUser());
        };
        if (user.status === 'succeeded') {
            dispatch(setSocket(socket.id));
        };
    }, [user.status])

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