import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { roomIdReducer, roomNameReducer, sendToReducer } from "../../../../redux/reducers/userReducers/userSlice"


const ChatItem = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleRoomClick = (e) => {
        const roomId = props.socketid
        const room = e.target.innerText
        dispatch(roomNameReducer(room))
        dispatch(roomIdReducer(roomId))
    }

    useEffect(() => {
        if(user.roomId !== ''){
            props.socket.emit('join-room', {
                room: user.roomName,
                roomId: user.roomId,
                isPerson: true
            });
        }
    },[user.roomId])

    return (
        <div className="chat-item" socketid={props.socketid} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default ChatItem