import React from "react"
import { withRouter } from "react-router";
import ChatContainer from "../../components/Chat/"
import { io } from "socket.io-client";
import { WEB_SOCKET_URL } from '../../constants';

const socket = io(WEB_SOCKET_URL)

function Chat() {
    return (
        <ChatContainer
            socket={socket}
        />
    )
}
export default withRouter(Chat)

