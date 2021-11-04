import React from "react";
import addBtn from "../../../../stylesheets/icons/add.svg"

export default function AddRoom(props) {
    const {active, handleAddRoomClick, addRoom, setAddRoomName } = props
    const button = <img src={addBtn} alt="addBtn" className="add-room-button" onClick={handleAddRoomClick} />
    const input = (
        <div className="add-room">
            <input
                className="add-room-input"
                onChange={e => setAddRoomName(e.target.value)}
                onKeyDown={addRoom}
                type="text"
                placeholder="Channel name..." />
        </div>
    );
    const currentComponent = active ? input : button;
    return currentComponent;
}

