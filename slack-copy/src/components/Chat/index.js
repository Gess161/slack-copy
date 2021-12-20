import Sidebar from "./Sidebar"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSocket } from "../../redux/actions/userSlice";
import { fetchUser } from "../../redux/thunk/fetchUser";
import SocketService from "../../services/api/socket/socketService"
import ChatContainer from "./ChatContainer";
import chatCallbacks from "../../services/chatCallbacks";

export default function Chat(props) {
    const dispatch = useDispatch();
    const location = props.history.location.pathname
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
        modal: false,
    })

    const Service = new SocketService(chatCallbacks(user, setState, dispatch, state), user);
    const socket = Service.socket

    const sendData = () => {
        if (state.message === '') return;
        Service.sendMessage(user, state)
        setState(prevState => ({
            ...prevState,
            message: "",
        }));
    };

    useEffect(() => {
        Service.addListener(socket);
        return () => {
            Service.removeListener(socket)
        }
    }, [user, socket])

    useEffect(() => {
        location !== "/chat" ? Service.disconnect() : Service.connect()
    }, [location])

    useEffect(() => {
        if (socket.connected) {
            socket.emit('user-log-in', user.user, user.socket);
        }
    }, [socket.connected])

    useEffect(() => {
        if (user.status === 'idle') {
            dispatch(fetchUser());
        };
        if (user.status === 'succeeded') {
            dispatch(setSocket(socket.id));
            setState(prevState => ({
                ...prevState,
                user: user.user,
                email: user.email
            }))
        };
    }, [user.status, user.email, user.user, socket])

    return (
        <div className="client">
            <Sidebar
                socket={socket}
                state={state}
                user={user}
                rooms={rooms}
                setState={setState}
            />
            <ChatContainer
                sendData={sendData}
                setState={setState}
                user={user}
                state={state}
                messages={messages}
            />
        </div>
    )
}