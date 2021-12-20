import { setRoomId, setRoomName } from "../redux/actions/userSlice";
import { setRoomList } from "../redux/actions/roomSlice";
import { replaceMessages, setMessages } from "../redux/actions/messagesSlice";
import { roomAddedHandler } from "./api/socket/addRoom";

export default function chatCallbacks(user, setState, dispatch, state) {
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
            roomAddedHandler(user.socket, user, rooms)
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
    }
    return chatCallbacks;
}