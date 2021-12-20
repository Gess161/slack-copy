import AddRoom from "../AddRoomBtn"
import RoomList from "../RoomList"
import ChatList from "../ChatList"
import { app, bell, search } from "../../../../stylesheets/icons/icons";

export default function ClientPanel(props) {

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
        <div className="client-panel">
            <h2 className="client-panel-header ">
                <div className="header">
                    <div className="header-top">
                        <div className="header-text-name">Hlack Mockup</div>
                        <div className="client-panel-arrow"></div>
                    </div>
                    <div className="header-bottom">
                        <div className="online-indicator"></div>
                        <div className="header-bottom-user">{user.user}</div>
                    </div>
                </div>
                <img alt="icon" src={bell} className="client-panel-bell" />
            </h2>
            <div className="jump-to">
                <img alt="icon" className="search" src={search} />
                <input placeholder="Jump to..." />
            </div>
            <div className="apps">
                <img alt="icon" className="icon" src={app} />
                <p>Apps</p>
            </div>
            <div className="channels-rooms channels" >
                <p>Channels</p>
                <AddRoom
                    active={state.active}
                    setState={setState}
                    socket={socket}
                    addRoom={addRoom}
                    handleAddRoomClick={handleAddRoomClick}
                />
            </div>
            <RoomList
                unreadMessages={state.unreadMessages}
                handleRoomClick={handleRoomClick}
                rooms={rooms}
                socket={socket}
                activeChat={user.room}
            />
            <ChatList
                user={user}
                unreadMessages={state.unreadMessages}
                handleRoomClick={handleUserClick}
                usersList={state.usersList}
                socket={socket}
            />
        </div>
    )
}