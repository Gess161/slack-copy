import { useDispatch } from "react-redux"
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice"

const ChatItem = (props) => {
    const dispatch = useDispatch()
    const handleRoomClick = (e) => {
        const roomId = props.socketid
        console.log(roomId)
        const room = e.target.innerText
        dispatch(roomNameReducer(room))
        dispatch(roomIdReducer(roomId))
    }

    return (
        <div className="chat-item" socketid={props.socketid} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default ChatItem