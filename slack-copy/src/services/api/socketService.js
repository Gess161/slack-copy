import { setRoomId, setRoomName } from "../../redux/actions/userSlice";
import { setMessages, replaceMessages } from "../../redux/actions/messagesSlice";
import { setRoomList } from "../../redux/actions/roomSlice"

export default function socketService(socket, setState, state, user, dispatch) {
    
    socket.on('initial-rooms', rooms => {
        dispatch(setRoomList(rooms));
    });
    socket.on('current-room', ({ room, roomId }) => {
        if (roomId === null) {
            dispatch(setRoomId(room))
        } else {
            dispatch(setRoomId(roomId))
        }
        dispatch(setRoomName(room))
    })
    socket.on('room-joined', data => {
        dispatch(replaceMessages(data));
    })
    socket.on('room-added', rooms => {
        rooms.map(room => {
            socket.emit('join-room', {
                user: user.user,
                room: room,
                roomId: room,
            });
        })
        dispatch(setRoomList(rooms));
    });
    socket.on('users-connected', users => setState(prevState => ({
        ...prevState,
        usersList: users
    })))
    socket.on('users-disconnected', users => setState(prevState => ({
        ...prevState,
        usersList: users
    })))
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
}