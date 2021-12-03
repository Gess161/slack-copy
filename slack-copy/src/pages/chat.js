import React from "react"
import { withRouter } from "react-router";
import ChatContainer from "../components/Chat"
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_WEB_SOCKET_URL)

function Chat(props) {
    const history = props.history
    return (
        <ChatContainer
            socket={socket}
            history={history}
        />
    )
}
export default withRouter(Chat)

