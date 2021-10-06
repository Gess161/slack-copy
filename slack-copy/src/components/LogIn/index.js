import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants';
import { withRouter } from 'react-router';
import LoginForm from './Form';

function LogIn(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    });
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const redirectToSignUp = () => {
        props.history.push('/');
    };
    const redirectToChat = () => {
        props.history.push('/chat');
    };
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password,
            };
            axios.post(API_BASE_URL + "/user/login", payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            successMessage: 'Authentification succesful. Logging in...'
                        }));
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToChat();
                        props.showError(null);
                    } else if (response.status === 204) {
                        props.showError("Username or password does not match");
                    } else {
                        props.showError("Username does not exists");
                    };
                })
                .catch(error => {
                    props.showError(error.response.data.errorMessage);
                });
        } else {
            props.showError('Please enter valid username and password');
        };
    };
    const handleSubmit = (e) => {
        sendDetailsToServer();
    };
    return (
        <div id="login" className="auth-container" >
            <img class="logo" alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" />
            <h2 className="greeting">Log in</h2>
            <LoginForm 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                email={state.email} 
                password={state.password} />
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="form-already">
                <span>Don't have an account? </span>
                <span className="login-here" onClick={() => redirectToSignUp()}>Register</span>
            </div>
        </div>
    );
};
export default withRouter(LogIn)