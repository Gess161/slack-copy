import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageReplaceReducer } from "../../../redux/reducers/userReducers/messagesSlice";
import { roomIdReducer, roomNameReducer } from "../../../redux/reducers/userReducers/userSlice";

const MessageContainer = (props) => {
    const dispatch = useDispatch();
    const room = useSelector(state => state.user.roomName);
    const newMessages = useSelector(state => state.message.messages);

    useEffect(() => {
        props.socket.emit('join-room', room);
    },[room, props.socket]);

    useEffect(() => {
        props.socket.on('current-room', room => {
            if(room === 'General'){
                dispatch(roomIdReducer(''))
            } else {
                dispatch(roomIdReducer(room))
            }
            dispatch(roomNameReducer(room))
        })
    }, [room, props.socket, dispatch])

    useEffect(() => {
        props.socket.on('room-joined', data => {
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                const text = `${data[i].user}: ${data[i].message}`;
                arr.push(text);
            };
            dispatch(messageReplaceReducer(arr));
        })
    }, [props.socket, dispatch]);

    return (
        <div id="message-container">
            <div className="current-room">Room: {props.roomName}</div>
            {newMessages.map((message, index) => {
                return (
                    <div key={index}>{message}</div>
                );
            })}
        </div>
    );
};

export default MessageContainer;