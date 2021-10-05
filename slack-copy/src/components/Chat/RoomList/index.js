import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomItem from "./RoomListItem";
import { roomAddArrayReducer } from "../../../redux/reducers/userReducers/roomSlice";

const RoomList = (props) => {
    const socket = props.socket;
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.room.roomList);
 
    useEffect(() => {
        socket.on(('initial-rooms'), rooms => {
            console.log('initial rooms', rooms)
            dispatch(roomAddArrayReducer(rooms));
        });

        socket.on(('room-deleted'), rooms => {
            dispatch(roomAddArrayReducer(rooms));
        });

        socket.on(('room-added'), rooms => {
            dispatch(roomAddArrayReducer(rooms));
        });
    }, [socket, rooms, dispatch]);

    return (
        <div className="chat-panel-list">
            <RoomItem name='general' socket={socket} />
            {Object.keys(rooms).map(key => {
                return (
                    <RoomItem
                        name={rooms[key]}
                        key={[key]}
                        socket={socket}
                    />
                );
            })}
        </div>
    );
};

export default RoomList;