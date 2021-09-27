import { useSelector } from "react-redux"

const MessageContainer = () => {
    const messageList = useSelector(state => state.message.messages.messages)
    console.log(messageList)

    return (
        <div id="message-container">
            {messageList.map(message => {
                return (
                    <div>{message}</div>
                )
            })}
        </div>
    )
}

export default MessageContainer;