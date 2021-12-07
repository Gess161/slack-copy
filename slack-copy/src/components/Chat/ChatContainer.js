import Header from "./Header";
import MessageContainer from "./MessageContainer";
import MessageForm from "./MessageForm";
import { useEffect } from "react";

export default function ChatContainer(props) {
    const {
        setState,
        user,
        state,
        messages,
        sendData
    } = props;

    const handleKeyUp = e => {
        const textarea = document.querySelector('textarea');
        textarea.style.height = `auto`
        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            sendData();
        }
    };

    useEffect(() => {
        const textarea = document.querySelector('textarea');
        textarea.addEventListener("keyup", handleKeyUp)
        return () => textarea.removeEventListener("keyup", handleKeyUp)
    })

    return (
        <div className="chat-container">
            <Header
                setState={setState}
                user={user}
                roomName={user.roomName}
                userList={state.usersList}
                state={state}
                error={state.error}
            />
            <MessageContainer
                messages={messages}
            />
            <MessageForm
                message={state.message}
                roomName={user.roomName}
                setState={setState}
                handleKeyDown={handleKeyDown}
                handleKeyUp={handleKeyUp}
                sendData={sendData}
            />
        </div>
    )
}