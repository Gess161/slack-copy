import { useDispatch } from "react-redux"
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice"


const RoomItem = (props) => {
    const dispatch = useDispatch()
    const handleRoomClick = (e) => {
        const room = e.target.innerText
        dispatch(roomNameReducer(room));
        dispatch(roomIdReducer(room));
        props.socket.emit('join-room', room);
    }

    return (
        <div className="chat-item" socket={props.socket} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default RoomItem