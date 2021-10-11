import React, { useState } from 'react';
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/index';
import { withRouter } from 'react-router';
import SignUpForm from './Form';

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
            <img className="logo" alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg"/>
            <h2 className="greeting">Welcome to Slack!</h2>
            <SignUpForm 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                email={state.email} 
                password={state.password} 
                confirmPassword={state.confirmPassword} />
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