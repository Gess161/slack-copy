const RoomItem = (props) => {
    const handleRoomClick = (e) => {
        console.log('i worked on room', e.target.innerText)
        props.socket.emit('join-room', e.target.innerText);
    }
    return (
        <div className="chat-item" socket={props.socket} onClick={handleRoomClick} >{props.name}</div>
    )
}

export default RoomItem;