import { useSelector } from "react-redux"

const MessageContainer = (props) => {
    const messageList = useSelector(state => state.message.messages.messages)
    return (
        <div id="message-container">
        <div className="current-room">Room: {props.roomName}</div>
            {messageList.map((message, index) => {
                return (
                    <div key={index}>{message}</div>
                )
            })}
        </div>
    )
}

export default MessageContainer;