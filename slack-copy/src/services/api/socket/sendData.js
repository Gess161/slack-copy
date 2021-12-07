export const sendData = (user, socket, state) => {
    if (user.roomName === user.roomId) {
        const msg = {
            image: user.image,
            sender: socket.id,
            senderName: user.user,
            message: state.message,
            recipient: user.roomId,
            recipientName: user.roomName
        }
        socket.emit('message', msg);
    } else {
        const msg = {
            image: user.image,
            senderName: user.user,
            recipientName: user.roomName,
            message: state.message,
            sender: socket.id,
            recipient: user.roomId
        }
        socket.emit('private-message', msg)
    }
}