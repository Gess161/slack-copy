import React from "react"
import { withRouter } from "react-router";
import ChatContainer from "../components/Chat"

function Chat(props) {
    const history = props.history

    return (
        <ChatContainer
            history={history}
        />
    )
}
export default withRouter(Chat)

