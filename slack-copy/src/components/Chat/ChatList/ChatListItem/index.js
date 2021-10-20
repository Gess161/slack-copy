import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { roomIdReducer, roomNameReducer } from "../../../../redux/reducers/userReducers/userSlice"
import userPicture from "../../../../stylesheets/icons/user.png"


const ChatItem = (props) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleRoomClick = (e) => {
        const roomId = props.socketid
        const room = e.target.innerText
        if(room !== user.roomName){
            props.socket.emit('join-room', {
                user: user.user,
                room: room,
                roomId: roomId
            });
            dispatch(roomNameReducer(room))
            dispatch(roomIdReducer(roomId))
        }
    }
    const style = props.name === props.active ? {opacity: 1, fontWeight: 700, color: 'white'} : {opacity: 0.8}
    return (
        <div className="chat-item">
            <img className="icon" alt="user" src={userPicture}/>
            <div className="chat-item" style={style} socketid={props.socketid} onClick={handleRoomClick} >{props.name}</div>
        </div>
    )
}

export default ChatItem