import Sidebar from "./Sidebar"
import Header from "./Header"
import MessageContainer from "./MessageContainer"
import MessageForm from "./MessageForm"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSocket } from "../../redux/actions/userSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import socketService from "../../services/api/socketService";

export default function ChatContainer(props) {
    const socket = props.socket;
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
        if (socket.connected) {
            socket.emit('user-log-in', user.user, user.socket);
            socketService(socket, setState, state, user, dispatch)
        }
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