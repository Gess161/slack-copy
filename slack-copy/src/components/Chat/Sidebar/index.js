import AddRoom from "../AddRoomBtn";
import RoomList from "../RoomList";
import ChatList from "../ChatList";
import { app, bell, search } from "../../../stylesheets/icons/icons"

const Sidebar = (props) => {
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
                        <div className="header-bottom-user">{props.user}</div>
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
            <div className="channels">
                <p>Channels</p>
                <AddRoom socket={props.socket} />
            </div>
            <RoomList socket={props.socket} />
            <ChatList me={props.user} socket={props.socket} />
        </div>
    )
}

export default Sidebar;