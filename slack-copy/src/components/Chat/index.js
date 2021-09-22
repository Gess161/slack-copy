import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants";
import { useSelector, useDispatch } from "react-redux"
import { selectUser, userReducer } from "../../redux/userReducer/userSlice"


function ChatRender(props) {
    const user = useSelector(selectUser)
    const dispatch = useDispatch(userReducer)
    const [state, setState] = useState({
        message: '',
        room: '',
    })

    const appendMessage = (message, user) => {
        const messageContainer = document.getElementById('message-container')
        const messageElement = document.createElement('div')
        messageElement.innerText = `user: ${message}`
        messageContainer.append(messageElement)
    }


    const sendData = () => {
        if (state.message === '') return;
        if (state.room === '' && state.message === '') return;
        props.socket.emit('message', state.message);
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleSubmit = (e) => {
        e.target.id === "join-button" ? setState({ message: state.message, room: '' }) : setState({ message: '', room: state.room })
        sendData()
    }

    const fetchUser = user => {
        return async (dispatch, getState) => {
            try {
                const user = await axios.get(API_BASE_URL + "/user/me", { headers: { "token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
                    .then(res => {
                        return res.data.email
                    })
                    dispatch(userReducer, user)
            } catch(err){
                console.log('while dispatch', err)
            }
        }
    }
    useEffect(() => {
        axios.get(API_BASE_URL + "/user/me", { headers: { "token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(res => {
                if (res.status !== 200) {
                    redirectToLogin()
                }
                console.log(res)
            })
            .catch(err => {
                console.error(err)
                redirectToLogin()
            })
    })
    const messageDep = props.socket.sendBuffer.length > 0
    useEffect(() => {
        props.socket.on('send-message', message => {
            appendMessage(message)
        })

    }, [messageDep, props.socket])

    function redirectToLogin() {
        props.history.push('/login')
    }

    return (
        <div className="d-flex w-100 h-100 flex-column">
            <div id="message-container"></div>
            <form id="form" className="d-flex flex-column border border-dark">
                <div className="d-flex flex-row">
                    <label
                        style={{ width: 100 }}
                        htmlFor="message"> Message </label>
                    <input
                        onChange={handleChange}
                        className="w-50 m-2"
                        type="text"
                        id="message"
                        value={state.message} />
                    <button
                        onClick={handleSubmit}
                        className="w-50 m-2"
                        type="button"
                        id="send-button">Send</button>
                </div>
                <div className="d-flex flex-row">
                    <label
                        style={{ width: 100 }}
                        htmlFor="room"> Room </label>
                    <input
                        onChange={handleChange}
                        className="w-50 m-2"
                        type="text"
                        id="room"
                        value={state.room} />
                    <button
                        onClick={handleSubmit}
                        className="w-50 m-2"
                        type="button"
                        id="join-button">Join</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(ChatRender)