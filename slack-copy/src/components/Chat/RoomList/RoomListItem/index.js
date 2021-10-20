import React from "react"
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
    const style = props.name === props.active ? {opacity: 1, fontWeight: 700, color: 'white'} : {opacity: 0.8}
    return (
        <div className="room-item">
            <img className="icon" alt="#" src={hashtag}/>
            <div className="room-item" style={style} socket={props.socket} onClick={handleRoomClick} >{props.name}</div>
        </div>
    )
}

export default RoomItem;