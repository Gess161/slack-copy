import { useEffect, useState } from "react";
import ChatItem from "./ChatListItem/";


const ChatPanelList = (props) => {
    const socket = props.socket;
    const [usersList, setUsersList] = useState({});

    useEffect(() => {
        socket.on('users-connected', userList => setUsersList(userList));
        socket.on('user-disconnected', userList => setUsersList(userList));
        return;
    }, [socket]);

    return (
        <div className="channels">
            <p>Direct Messages</p>
            {Object.keys(usersList).map(key => {
                if (key !== props.me)
                    return (
                        <ChatItem
                            active={props.active}
                            name={key}
                            key={usersList[key]}
                            socket={socket}
                            socketid={usersList[key]}
                        />
                    );
            })}
        </div>
    );
};

export default ChatPanelList