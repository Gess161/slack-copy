import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice"
import userPicture from "../../../../stylesheets/icons/user.png"


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
        if (user.roomId !== '') {
            props.socket.emit('join-room', {
                room: user.roomName,
                roomId: user.roomId,
                isPerson: true
            });
        }
    }, [user.roomId])

    return (
        <div className="room-item">
            <img className="icon" alt="user" src={userPicture}/>
            <div className="chat-item" socketid={props.socketid} onClick={handleRoomClick} >{props.name}</div>
        </div>
    )
}

export default ChatItem