import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomItem from "./RoomListItem";
import { deleteRoomReducer, roomListReducer } from "../../../redux/reducers/userReducers/roomSlice";

const RoomList = (props) => {
    const rooms = useSelector(state => state.room.roomList)
    console.log(rooms)
    const dispatch = useDispatch();
    const socket = props.socket


    useEffect(() => {
        socket.on(('initial-rooms'), rooms => {
            dispatch(roomListReducer(rooms))
        })
        socket.on(('room-deleted'), rooms => {
            dispatch(deleteRoomReducer(rooms))
        })
        socket.on(('room-added'), rooms => {
            dispatch(roomListReducer(rooms))
        })
    }, [socket, rooms, dispatch])

    return (
        <div className="chat-panel-list">
            <RoomItem name='General' socket={socket} />
            {Object.keys(rooms).map(key => {
                return (
                    <RoomItem
                        name={rooms[key]}
                        key={[key]}
                        socket={socket}
                    />
                )
            })}
        </div>
    )
}

export default RoomList;