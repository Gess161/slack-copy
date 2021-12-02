import Sidebar from "./Sidebar"
import Header from "./Header"
import MessageContainer from "./MessageContainer"
import MessageForm from "./MessageForm"
import { useEffect } from "react"

export default function ChatContainer (props){
    const {
        setState,
        socket,
        messages,
        message,
        unreadMessages, 
        user, 
        rooms, 
        usersList, 
        handleAddRoomClick, 
        handleRoomClick, 
        handleUserClick,
        state,
        error,
        addRoomFunction, 
    } = props;
    
    const sendData = () => {
        if (message === '') return;
        if (user.roomName === user.roomId) {
            const msg = {
                image: user.image,
                sender: socket.id,
                senderName: user.user,
                message: message,
                recipient: user.roomId,
                recipientName: user.roomName
            }
            socket.emit('message', msg);
        } else {
            const msg = {
                image: user.image,
                senderName: user.user,
                recipientName: user.roomName,
                message: message,
                sender: socket.id,
                recipient: user.roomId
            }
            socket.emit('private-message', msg)
        }
        setState(prevState => ({
            ...prevState,
            message: "",
        }));;
    };

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
        <div className="client">
        <Sidebar
            state={state}
            unreadMessages={unreadMessages}
            user={user}
            rooms={rooms}
            usersList={usersList}
            handleAddRoomClick={handleAddRoomClick}
            handleRoomClick={handleRoomClick}
            handleUserClick={handleUserClick}
            addRoom={addRoomFunction}
            addRoomActive={state.active}
            setState={setState}
        />
        <div className="chat-container">
            <Header
                setState={setState}
                user={user}
                roomName={user.roomName}
                userList={usersList}
                state={state}
                error={error}
            />
            <MessageContainer
                messages={messages}
            />
            <MessageForm
                message={message}
                roomName={user.roomName}
                setState={setState}
                handleKeyDown={handleKeyDown}
                handleKeyUp={handleKeyUp}
                sendData={sendData}
            />
        </div>
    </div>
    )
}