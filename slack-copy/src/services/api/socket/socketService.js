import { sendData } from "./sendData"
import { io } from "socket.io-client";
import { roomAddedHandler } from "./addRoom";

const socket = io(process.env.REACT_APP_WEB_SOCKET_URL)
const events = {
    getPrivate: "get-private",
    getMessage: "get-message",
    usersDisconnected: "users-disconnected",
    usersConnected: "users-connected",
    roomAdded: "room-added",
    roomJoined: "room-joined",
    currentRoom: "current-room",
    initialRooms: "initial-rooms"
}
class SocketService {
    constructor(callbacks, user) {
        this.callbacks = callbacks;
        this.socket = socket;
        this.user = user;
    }
    roomAdded() {
        socket.on("room-added", (rooms) => {
            roomAddedHandler(socket, this.user, rooms)
        })
    }
    sendMessage(user, state) {
        sendData(user, this.socket, state);
    }
    addListener() {
        const keys = Object.keys(this.callbacks)
        for (let i = 0; i < keys.length; i++) {
            socket.on(events[keys[i]], this.callbacks[keys[i]])
        }
    }
    removeListener() {
        const keys = Object.keys(events)
        for (let i = 0; i < keys.length; i++) {
            socket.removeAllListeners(events[keys[i]])
        }
    }
    connect() {
        socket.connect()
    }
    disconnect() {
        socket.disconnect()
    }
}

export default SocketService;
