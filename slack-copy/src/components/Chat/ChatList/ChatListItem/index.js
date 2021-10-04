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
        dispatch(sendToReducer(roomId))
        dispatch(roomIdReducer(user.socket))
    }

    useEffect(() => {
        if(user.sendTo !== ''){
            console.log(user.sendTo)
            props.socket.emit('join-room', user.sendTo);
        }
    },[user.sendTo])

    return (
        <div className="chat-item" socketid={props.socketid} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default ChatItem