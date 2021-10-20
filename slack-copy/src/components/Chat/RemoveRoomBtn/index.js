import React from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomIdReducer, roomNameReducer } from "../../../redux/reducers/userReducers/userSlice";


export default function DeleteRoom(props) {
    const dispatch = useDispatch();
    const socket = props.socket;
    const roomList = useSelector(state => state.room.roomList);
    const [active, setActive] = useState(false);
    const [roomname, setRoomname] = useState('');


    const handleButtonClick = () => {
        setActive(!active);
    };

    const onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            if (!roomList.includes(roomname)) return alert(`This room doesn't exist`);
            socket.emit('delete-room', roomname);
            dispatch(roomIdReducer('general'));
            dispatch(roomNameReducer('general'));
            setActive(!active);
            setRoomname('');
        };
    };

    const button = <button onClick={handleButtonClick}>Delete room</button>
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

