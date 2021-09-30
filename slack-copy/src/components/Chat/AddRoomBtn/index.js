import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomListReducer } from "../../../redux/reducers/userReducers/roomSlice";

export default function AddRoom(props) {
    const socket = props.socket;
    const dispatch = useDispatch();
    const roomList = useSelector(state => state.room.roomList);
    const [active, setActive] = useState(false);
    const [roomname, setRoomname] = useState('');

    const handleButtonClick = () => {
        setActive(!active);
    };

    const onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            if (roomList.includes(roomname)) return alert('This room already exists');
            dispatch(roomListReducer(roomname));
            socket.emit('add-room', roomname);
            socket.emit('join-room', roomname);
            setActive(!active);
            setRoomname('');
        };
    };

    const button = <button onClick={handleButtonClick}>Add room</button>
    const input = (
        <div className="add-room">
            <input
                onChange={e => setRoomname(e.target.value)}
                onKeyDown={onKeyDownHandler}
                type="text"
                placeholder="Enter roomname..." />
        </div>
    );

    const currentComponent = active ? input : button;
    return currentComponent;
}

