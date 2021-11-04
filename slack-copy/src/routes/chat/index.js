import React, { useEffect, useState } from "react"
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setSocket, setRoomId, setRoomName, setUser } from "../../redux/actions/userSlice";
import { setMessages, replaceMessages } from "../../redux/actions/messagesSlice";
import { setRoomList, addRoom } from "../../redux/actions/roomSlice"
import { fetchUser } from "../../redux/thunk/fetchUser";
import uploadProfileData from "../../services/api/uploadProfileData"
import Sidebar from "../../components/Chat/Sidebar/index"
import Header from "../../components/Chat/Header"
import MessageContainer from "../../components/Chat/MessageContainer"
import MessageForm from "../../components/Chat/MessageForm"

function Chat(props) {
    const { socket } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rooms = useSelector(state => state.room.roomList);
    const messages = useSelector(state => state.message.messages);
    const [addRoomName, setAddRoomName] = useState('');
    const [usersList, setUsersList] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        user: user.user,
        email: user.email,
        active: false,
        overflow: false
    })
    const handlePasswordChange = () => {
        if (state.active) {
            setState(prevState => ({
                ...prevState,
                "active": !state.active
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                "active": !state.active,
                "password": "",
                "newPassword": "",
                "confirmPassword": ""
            }));
        }
    }
    const handleFile = (e) => {
        const file = e.target.files[0];
        setState(prevState => ({
            ...prevState,
            "image": file
        }));
    }
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const handleRoomClick = (e) => {
        const roomName = e.target.innerText
        console.log(roomName)
        socket.emit('join-room', {
            room: roomName,
            roomId: roomName,
        });
        dispatch(setRoomName(roomName))
        dispatch(setRoomId(roomName))
    }
    const handleSubmit = async () => {
        const formData = new FormData()
        for (let key in state) {
            formData.append(key, state[key])
        }
        const data = await uploadProfileData(formData)
        if (typeof data === "string") {
            setError(data)
        } else {
            dispatch(setUser(data))
            handleModal()
            setError(null)
        }
    }
    const handleModal = e => {
        setState(prevState => ({
            ...prevState,
            "overflow": !state.overflow
        }));
    }
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
        } else if (e.keyCode === 13 && e.shiftKey) {
            console.log(e.target.value)
        }
    };
    const handleUserClick = (e) => {
        const roomId = e.target.socketId
        const room = e.target.innerText
        if (room !== user.roomName) {
            socket.emit('join-room', {
                user: user.user,
                room: room,
                roomId: roomId
            });
            dispatch(setRoomName(room))
            dispatch(setRoomId(roomId))
        }
    }
    const handleAddRoomClick = () => {
        setState(prevState => ({
            ...prevState,
            "active": !state.active
        }));
    };
    const sendData = () => {
        if (message === '') return;
        if (user.roomName === user.roomId) {
            const msg = {
                image: user.image,
                sender: socket.id,
                senderName: user.user,
                message: message,
                recipient: user.roomId,
                recipientName: user.roomName
            }
            socket.emit('message', msg);
        } else {
            const msg = {
                image: user.image,
                senderName: user.user,
                recipientName: user.roomName,
                message: message,
                sender: socket.id,
                recipient: user.roomId
            }
            socket.emit('private-message', msg)
        }
        setMessage('');
    };
    const addRoomFunction = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            console.log("roomname", addRoomName)
            if (rooms.includes(addRoomName)) return alert('This room already exists');
            dispatch(addRoom(addRoomName));
            dispatch(setRoomName(addRoomName))
            dispatch(setRoomId(addRoomName))
            socket.emit('add-room', addRoomName);
            socket.emit('join-room', addRoomName);
            setState(prevState => ({
                ...prevState,
                "active": !state.active
            }));
            setAddRoomName('');
            console.log(addRoomName)
        };
    };
    useEffect(() => {
        setState({
            user: user.user,
            email: user.email,
            previousName: user.user,
            active: false,
        })
    }, [user.user, user.email])
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
    }, []);
    useEffect(() => {
        const textarea = document.querySelector('textarea');
        textarea.addEventListener("keyup", handleKeyUp)
        return () => textarea.removeEventListener("keyup", handleKeyUp)
    })
    useEffect(() => {
        socket.on(('initial-rooms'), rooms => {
            dispatch(setRoomList(rooms));
        });
        socket.on(('room-added'), rooms => {
            dispatch(setRoomList(rooms));
        });
    }, []);
    useEffect(() => {
        socket.on('users-connected', users => setUsersList(users));
        socket.on('user-disconnected', users => setUsersList(users));
    }, [usersList]);
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
            console.log(user)
            console.log(msg)
            if (msg.recipientName === user.roomName) {
                console.log("message dispatched")
                dispatch(setMessages(msg));
            } else {
                console.log("not that room")
            }
        })
    }, []);
    useEffect(() => {
        if (user.socket) socket.emit('user-log-in', user.user, user.socket);
    }, [user.socket, socket, user.user]);
    useEffect(() => {
        socket.on('get-private', (msg) => {
            if (user.roomName === msg.recipientName || user.roomName === msg.senderName) {
                dispatch(setMessages(msg));
            }
        })
    }, [user.roomName])

    return (
        <div className="client">
            <Sidebar
                user={user}
                rooms={rooms}
                usersList={usersList}
                handleAddRoomClick={handleAddRoomClick}
                handleRoomClick={handleRoomClick}
                handleUserClick={handleUserClick}
                addRoom={addRoomFunction}
                addRoomActive={state.active}
                setAddRoomName={setAddRoomName}
            />
            <div className="chat-container">
                <Header
                    user={user}
                    roomName={user.roomName}
                    userList={usersList}
                    state={state}
                    handleModal={handleModal}
                    handlePasswordChange={handlePasswordChange}
                    handleFile={handleFile}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    error={error}
                />
                <MessageContainer
                    messages={messages}
                />
                <MessageForm
                    message={message}
                    roomName={user.roomName}
                    setMessage={setMessage}
                    handleKeyDown={handleKeyDown}
                    handleKeyUp={handleKeyUp}
                    sendData={sendData}
                />
            </div>
        </div>
    )
}

export default withRouter(Chat)

