import React, { useState } from 'react';
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/index';
import { withRouter } from 'react-router';
import logo from '../../stylesheets/logo/logo.svg'

function SignUp(props) {
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
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    };
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            const payload = {
                "email": state.email,
                "password": state.password,
            };
            axios.post(API_BASE_URL + "/user", payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            successMessage: 'Registration successful. Redirecting to home page..'
                        }));
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToLogin();
                    };
                })
                .catch( error => {
                    props.showError(error.response.data.errorMessage)
                });
        } else {
            props.showError('Please enter valid username and password')
        };
    };
    const handleSubmit = () => state.password === state.confirmPassword ? sendDetailsToServer() : props.showError('Passwords do not match');

    return (
        <div className="auth-container">
            <img class="logo" alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg"/>
            <h2 className="greeting">Welcome to Slack!</h2>
            <form className="form">
                <div className="form-part">
                    <label className="form-label" htmlFor="exampleInputEmail1">Email address</label>
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
                    <label className="form-label" htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-input"
                        id="password"
                        placeholder="mysecretpassword123"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <small id="passwordHelp" className="form-small">Password must contain at least 6 characters</small>
                </div>
                <div className="form-part">
                    <label className="form-label" htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                        className="form-input"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
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
                <span>Already have an account? </span>
                <span className="login-here" onClick={redirectToLogin}>Login here</span>
            </div>
        </div>
    );
};

export default withRouter(SignUp);