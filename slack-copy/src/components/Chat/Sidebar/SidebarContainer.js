import AddRoom from "./AddRoomBtn/index";
import RoomList from "./RoomList/index";
import ChatList from "./ChatList/index";
import { app, bell, search } from "../../../stylesheets/icons/icons"

export default function SidebarContainer(props) {
    const {
        handleAddRoomClick,
        usersList,
        unreadMessages,
        handleUserClick,
        user,
        addRoomActive,
        setState,
        socket,
        rooms,
        addRoom,
        handleRoomClick,
        currentChat,
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
                    active={addRoomActive}
                    setState={setState}
                    socket={socket}
                    addRoom={addRoom}
                    handleAddRoomClick={handleAddRoomClick}
                />
            </div>
            <RoomList
                unreadMessages={unreadMessages}
                handleRoomClick={handleRoomClick}
                rooms={rooms}
                socket={socket}
                activeChat={currentChat}
            />
            <ChatList
                unreadMessages={unreadMessages}
                handleRoomClick={handleUserClick}
                usersList={usersList}
                me={user}
                activeChat={currentChat}
                socket={socket}
            />
        </div>
    )
}