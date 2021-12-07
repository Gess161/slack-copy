import AddRoom from "./AddRoomBtn/index";
import RoomList from "./RoomList/index";
import ChatList from "./ChatList/index";
import { app, bell, search } from "../../../stylesheets/icons/icons"
import ClientPanel from "./ClientPanel";

export default function SidebarContainer(props) {
    const {
        state,
        handleAddRoomClick,
        handleUserClick,
        user,
        setState,
        socket,
        rooms,
        addRoom,
        handleRoomClick,
    } = props;
    return (
        <ClientPanel 
            state={state}
            handleAddRoomClick={handleAddRoomClick}
            handleUserClick={handleUserClick}
            user={user}
            setState={setState}
            socket={socket}
            rooms={rooms}
            addRoom={addRoom}
            handleRoomClick={handleRoomClick}
        />
    )
}