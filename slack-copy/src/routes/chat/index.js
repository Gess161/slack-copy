import React, { useEffect, useState } from "react"
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setSocket, setRoomId, setRoomName, setUser } from "../../redux/actions/userSlice";
import { setMessages, replaceMessages } from "../../redux/actions/messagesSlice";
import { setRoomList, addRooms } from "../../redux/actions/roomSlice"
import { fetchUser } from "../../redux/thunk/fetchUser";
import uploadProfileData from "../../services/api/uploadProfileData"
import Sidebar from "../../components/Chat/Sidebar/index"
import Header from "../../components/Chat/Header"
import MessageContainer from "../../components/Chat/MessageContainer"
import MessageForm from "../../components/Chat/MessageForm"

export default function Chat(props) {
    const { socket } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rooms = useSelector(state => state.room.roomList);
    const messages = useSelector(state => state.message.messages);
    const [addRoomClicked, setClicked] = useState(false);
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
        //mb objedenit s handle pass change
        setState(prevState => ({
            ...prevState,
            "active": !state.active
        }));
    };
    const addRoom = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            if (rooms.includes(addRoomName)) return alert('This room already exists');
            dispatch(addRooms(addRoomName));
            dispatch(setRoomName(addRoomName))
            dispatch(setRoomId(addRoomName))
            socket.emit('add-room', addRoomName);
            socket.emit('join-room', addRoomName);
            setClicked(!addRoomClicked);
            setAddRoomName('');
        };
    };
    const handleRoomClick = (e) => {
        const roomName = e.target.innerText
        socket.emit('join-room', {
            room: roomName,
            roomId: roomName,
        });
        dispatch(setRoomName(roomName))
        dispatch(setRoomId(roomName))
    }
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
    }, [dispatch]);
    // useEffect(() => {
    //     const textarea = document.querySelector('textarea');
    //     textarea.addEventListener("keyup", handleKeyUp)
    //     return () => textarea.removeEventListener("keyup", handleKeyUp)
    // })
    useEffect(() => {
        socket.on(('initial-rooms'), rooms => {
            dispatch(setRoomList(rooms));
        });
        socket.on(('room-deleted'), rooms => {
            dispatch(setRoomList(rooms));
        });
        socket.on(('room-added'), rooms => {
            dispatch(setRoomList(rooms));
        });
    }, [socket, rooms, dispatch]);
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
            socket.on('get-message', (msg) => {
                dispatch(setMessages(msg));
            })
        };
    }, [user.status, dispatch]);
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
                addRoom={addRoom}
                addRoomClicked={addRoomClicked}
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

