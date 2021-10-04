import { useDispatch } from "react-redux";
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice";

const RoomItem = (props) => {
    const dispatch = useDispatch()
    const handleRoomClick = (e) => {
        const roomName = e.target.innerText
        props.socket.emit('join-room', {
            room: roomName,
            roomId: roomName,
        });
        dispatch(roomNameReducer(roomName))
        dispatch(roomIdReducer(roomName))
    }
    return (
        <div className="chat-item" socket={props.socket} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default RoomItem;