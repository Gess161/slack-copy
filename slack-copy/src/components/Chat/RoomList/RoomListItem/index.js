import { useDispatch } from "react-redux";
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice";
import hashtag from "../../../../stylesheets/icons/hashtag.svg"

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
        <div className="room-item">
            <img className="icon" alt="#" src={hashtag}/>
            <div className="chat-item" socket={props.socket} onClick={handleRoomClick} >{props.name}</div>
        </div>
    )
}

export default RoomItem;