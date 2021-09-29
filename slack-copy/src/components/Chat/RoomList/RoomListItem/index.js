import { useDispatch } from "react-redux"
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice"
import { initialMessageReducer } from "../../../../redux/reducers/userReducers/messagesSlice"


const RoomItem = (props) => {
    const dispatch = useDispatch()

    const handleRoomClick = (e) => {
        const room = e.target.innerText
        if(room === "General"){
            dispatch(roomIdReducer(''));
        } else {
            dispatch(roomIdReducer(room));
        };
        dispatch(roomNameReducer(room));
        dispatch(initialMessageReducer())
        props.socket.emit('join-room', room);
    }

    return (
        <div className="chat-item" socket={props.socket} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default RoomItem