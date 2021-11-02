import React from "react";
import Message from "../Message";

const MessageContainer = (props) => {
    const { messages } = props;
    // const dispatch = useDispatch();
    // const newMessages = useSelector(state => state.message.messages);

    // useEffect(() => {
    //     props.socket.on('current-room', (room, roomId) => {
    //         if (roomId === null) {
    //             dispatch(roomIdReducer(room))
    //         } else {
    //             dispatch(roomIdReducer(roomId))
    //         }
    //         dispatch(roomNameReducer(room))
    //     })
    // }, [props.socket, dispatch]);

    // useEffect(() => {
    //     props.socket.on('room-joined', data => {
    //         dispatch(messageReplaceReducer(data));
    //     })
    // }, [dispatch]);

    return (
        <div className="chat-field">
            {messages.map((message, index) => {
                return (
                    <Message key={index} index={index} message={message} />
                );
            })}
        </div>
    );
};

export default MessageContainer;