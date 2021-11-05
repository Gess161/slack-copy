import React from "react"
import hashtag from "../../../../../stylesheets/icons/hashtag.svg"
import Counter from "../../MessageCounter";
const RoomItem = (props) => {
    const { handleRoomClick, name, active, socketId } = props;
    const style = name === active ? {opacity: 1, fontWeight: 700, color: 'white'} : {opacity: 0.8}
    return (
        <div className="room-item">
            <img className="icon" alt="#" src={hashtag}/>
            <div className="room-item" style={style} socket={socketId} onClick={handleRoomClick} >{name}</div>
            <Counter />
        </div>
    )
}

export default RoomItem;