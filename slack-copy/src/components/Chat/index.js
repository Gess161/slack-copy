import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants";


function ChatRender(props) {
    const appendMessage = (message) => {
        const messageContainer = document.getElementById('message-container')
        const messageElement = document.createElement('div')
        messageElement.innerText = message 
        messageContainer.append(messageElement)
    }

    const [state, setState] = useState({
        message: '',
        room: ''
    })

    const sendData = () => {
        if (state.message === '') return;
        if (state.room === '' && state.message === '') return;
        console.log("props", props, "and state", state);
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
        e.target.id === "join-button" ? setState({message:state.message ,room: ''}) : setState({message: '', room: state.room})
        sendData()
    }

    useEffect(() => {
        axios.get(API_BASE_URL + "/user/me", { headers: { "token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (res) {
                if (res.status !== 200) {
                    redirectToLogin()
                }
            })
            .catch(function (err) {
                console.err(err)
                redirectToLogin()
            })
    })
    useEffect(() => {
        props.socket.on('send-message', message => {
            appendMessage(message)
        })
        
    }, [props.socket.sendBuffer.length > 0])

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