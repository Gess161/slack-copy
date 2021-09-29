import { useDispatch } from "react-redux"
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice"
import { initialMessageReducer } from "../../../../redux/reducers/userReducers/messagesSlice"
import { useEffect, useState } from "react"


const RoomItem = (props) => {
    const [room, setRoom] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (room === "General") {
            dispatch(roomIdReducer(''));
        } else {
            dispatch(roomIdReducer(room));
        };
        dispatch(roomNameReducer(room));
        dispatch(initialMessageReducer())
    }, [ room, dispatch])

    const handleRoomClick = (e) => {
        setRoom(e.target.innerText)
        props.socket.emit('join-room', room);
    }

    return (
        <div className="chat-item" socket={props.socket} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default RoomItem