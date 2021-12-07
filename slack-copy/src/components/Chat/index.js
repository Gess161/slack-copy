import Sidebar from "./Sidebar"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSocket } from "../../redux/actions/userSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import SocketService from "../../services/api/socket/socketService"
import { setRoomList } from "../../redux/actions/roomSlice";
import { setRoomId, setRoomName } from "../../redux/actions/userSlice";
import { replaceMessages, setMessages } from "../../redux/actions/messagesSlice";
import { roomAddedHandler } from "../../services/api/socket/addRoom";
import ChatContainer from "./ChatContainer";

export default function Chat() {
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
            roomAddedHandler(socket, user, rooms)
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

    Service.addListener(socket)

    const sendData = () => {
        if (state.message === '') return;
        Service.sendMessage(user, state)
        setState(prevState => ({
            ...prevState,
            message: "",
        }));;
    };

    useEffect(() => {
        if (socket.connected) {
            socket.emit('user-log-in', user.user, user.socket);
        }
    }, [socket.connected, user.roomId])

    useEffect(() => {
        if (user.status === 'idle') {
            dispatch(fetchUser());
        };
        if (user.status === 'succeeded') {
            dispatch(setSocket(socket.id));
        };
    }, [user.status])

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
            <ChatContainer
                sendData={sendData}
                setState={setState}
                user={user}
                roomName={user.roomName}
                userList={state.usersList}
                state={state}
                error={state.error}
                messages={messages}
                message={state.message}
            />
        </div>
    )
}