import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomItem from "./RoomListItem";
import { deleteRoomReducer, roomListReducer } from "../../../redux/reducers/userReducers/roomSlice";

const RoomList = (props) => {
    const [rooms, setRooms] = useState([])
    const dispatch = useDispatch();
    const socket = props.socket
    const roomsList = useSelector(state => state.room.roomList)

    useEffect(() => {
        socket.on(('users-connected'), rooms => {
            for (let i = 0; i < rooms.length; i++) {
                setRooms(rooms[i])
            }
        })
        socket.on(('room-deleted'), rooms => {
            for (let i = 0; i < rooms.length; i++) {
                setRooms(rooms[i])
            }
            dispatch(deleteRoomReducer(rooms))
        })
        socket.on(('room-added'), rooms => {
            for (let i = 0; i < rooms.length; i++) {
                setRooms(rooms[i])
            }
            dispatch(roomListReducer(rooms))
        })

    }, [socket, rooms, dispatch])




    return (
        <div className="chat-panel-list">
            <RoomItem name='General' socket={socket} />
            {Object.keys(roomsList).map(key => {
                return (
                    <RoomItem
                        name={roomsList[key]}
                        key={[key]}
                        socket={socket}
                    />
                )
            })}
        </div>
    )
}

export default RoomList;