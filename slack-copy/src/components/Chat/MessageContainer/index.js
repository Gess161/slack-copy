import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageReplaceReducer } from "../../../redux/reducers/userReducers/messagesSlice";
import { roomIdReducer, roomNameReducer } from "../../../redux/reducers/userReducers/userSlice";
import Message from "../Message";

const MessageContainer = (props) => {
    const dispatch = useDispatch();
    const newMessages = useSelector(state => state.message.messages);

    useEffect(() => {
        props.socket.on('current-room', (room, roomId) => {
            if (roomId === null) {
                dispatch(roomIdReducer(room))
            } else {
                dispatch(roomIdReducer(roomId))
            }
            dispatch(roomNameReducer(room))
        })
    }, [props.socket, dispatch]);

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
        <div className="chat-field">
            {newMessages.map((message, index) => {
                return (
                    <Message key={index} message={message}/>
                );
            })}
        </div>
    );
};

export default MessageContainer;