import React from "react";
import addBtn from "../../../../stylesheets/icons/add.svg"

export default function AddRoom(props) {
    const { handleAddRoomClick, addRoom, addRoomClicked, setAddRoomName } = props
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
    const currentComponent = addRoomClicked ? input : button;
    return currentComponent;
}

