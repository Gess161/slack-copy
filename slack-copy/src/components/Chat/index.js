import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux"
import { fetchUser } from "../../redux/reducers/userReducer/userSlice"


function ChatRender(props) {
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');
    const user = useSelector(state => state.user);
    const userStatus = useSelector(state => state.user.status);
    const dispatch = useDispatch();


    const sendData = () => {
        if (message === '') return;
        if (room === '' && message === '') return;
        props.socket.emit('message', message, user.user);
    }

    const appendMessage = async (message, user) => {
        const messageContainer = document.getElementById('message-container');
        const messageElement = document.createElement('div');
        messageElement.innerText = `${user}: ${message}`;
        messageContainer.append(messageElement);
    }

    useEffect(() => {
        if(userStatus === 'idle'){
            dispatch(fetchUser());
        }
    }, [userStatus, dispatch]);
    
    useEffect(() => {
        if(userStatus === 'succeeded')
        props.socket.on('get-message', (message, user) => {
            appendMessage(message, user);
        })
    },[userStatus])

    return (
        <div className="d-flex w-100 h-100 flex-column">
            <div id="message-container"></div>
            <form id="form" className="d-flex flex-column border border-dark">
                <div className="d-flex flex-row">
                    <label
                        className="p-2"
                        style={{ width: 100}}
                        htmlFor="message"> Message </label>
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-50 m-2"
                        type="text"
                        id="message"
                        value={message} />
                    <button
                        onClick={sendData}
                        className="w-50 m-2"
                        type="button"
                        id="send-button">Send</button>
                </div>
                <div className="d-flex p-2 flex-row">
                    Current user: {user.user}
                </div>
            </form>
        </div>
    )
}

export default withRouter(ChatRender)