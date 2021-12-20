function Counter(props) {
    const { unreadMessages, roomName } = props;
    const active = unreadMessages !== undefined && unreadMessages[roomName] !== null ? unreadMessages.hasOwnProperty(roomName) : false

    return (
        <div style={{ display: active ? 'flex' : 'none' }} className='message-counter'>
            {unreadMessages ? unreadMessages[roomName] : null}
        </div>
    )
}
export default Counter;