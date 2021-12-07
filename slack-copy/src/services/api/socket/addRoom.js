export const roomAddedHandler = (socket, user, rooms) => {
      rooms.map(room => {
            socket.emit('join-room', {
                user: user.user,
                room: room,
                roomId: room,
            });
        })
}