import React from "react"
import { useDispatch } from "react-redux";
import SidebarContainer from "./SidebarContainer"
import { setRoomId, setRoomName } from "../../../redux/actions/userSlice";
import { addRoom } from "../../../redux/actions/roomSlice";

const Sidebar = (props) => {
    const dispatch = useDispatch()
    const {
        socket,
        state,
        setState,
        user,
        rooms,
    } = props;

    const handleRoomClick = (e) => {
        const roomName = e.target.innerText
        socket.emit('join-room', {
            user: user.user,
            room: roomName,
            roomId: roomName,
        });
        dispatch(setRoomName(roomName))
        dispatch(setRoomId(roomName))
        setState(prevState => ({
            ...prevState,
            unreadMessages: {
                [roomName]: null,
            }
        }))
    }
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
        console.log(1)
        setState(prevState => ({
            ...prevState,
            "active": !state.active
        }));
    };
    const addRoomFunction = e => {
        const addRoomName = state.addRoomName
        if (e.keyCode === 13) {
            e.preventDefault()
            if (rooms.includes(addRoomName)) return alert('This room already exists');
            dispatch(addRoom(addRoomName));
            dispatch(setRoomName(addRoomName))
            dispatch(setRoomId(addRoomName))
            socket.emit('add-room', addRoomName);
            socket.emit('join-room', {
                user: user.user,
                room: addRoomName,
                roomId: addRoomName
            });
            setState(prevState => ({
                ...prevState,
                "active": !state.active,
                addRoomName: ''
            }));
        };
    };

    return (
        <SidebarContainer
            state={state}
            handleAddRoomClick={handleAddRoomClick}
            handleUserClick={handleUserClick}
            user={user}
            setState={setState}
            socket={socket}
            rooms={rooms}
            addRoom={addRoomFunction}
            handleRoomClick={handleRoomClick}
        />
    )
}

export default Sidebar;