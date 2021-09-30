import { useDispatch } from "react-redux"
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice"

const ChatItem = (props) => {
    const dispatch = useDispatch()
    const handleRoomClick = (e) => {
        const roomId = e.target.attributes.socketid.nodeValue
        const room = e.target.innerText
        dispatch(roomNameReducer(room)) 
        dispatch(roomIdReducer(roomId))
    }

    return (
        <div className="chat-item" socketid={props.socket} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default ChatItem