import ChatItem from "../ChatListItem"

const ChatPanelList = (userList) => {
    return (
        <div className="chat-panel-list">
            {userList.map(users => {
                return (
                    <ChatItem 
                        name={users.user}
                        key={users.id}
                        />
                )
            })}
        </div>
    )
}

export default ChatPanelList