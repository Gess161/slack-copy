import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants';
import { withRouter } from 'react-router';


function LogIn(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
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
        props.updateTitle('Register');
        props.history.push('/');
    };

    const redirectToChat = () => {
        props.updateTitle('Chat');
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
                .catch( error => {
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
            <img class="logo" alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg"/>
            <h2 className="greeting">Log in</h2>
            <form className="form">
                <div className="form-part">
                    <label className="form-label" htmlFor="exampleInputEmail1">Enter your email</label>
                    <input className="form-input" type="email"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="myname@work-email.com"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-small">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-part">
                    <label className="form-label"  htmlFor="exampleInputPassword1">Enter your password</label>
                    <input className="form-input" type="password"
                        id="password"
                        placeholder="mypassword"
                        value={state.password}
                        onChange={handleChange}
                    />
                <small id="passwordHelp" className="form-small">Password must contain at least 6 characters</small>
                </div>
                <button
                    type="button"
                    className="form-button"
                    onClick={handleSubmit}
                >
                    Click Me!
                </button>
            </form>
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