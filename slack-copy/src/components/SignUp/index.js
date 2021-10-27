import React, { useState } from 'react';
import { withRouter } from 'react-router';
import SignUpForm from './Form';
import sendDetailsSignup from '../../services/api/sendSignupDetails';

function SignUp(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null)
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
    const sendDetailsToServer = async () => {
        if (state.email.length && state.password.length) {
            const payload = {
                "email": state.email,
                "password": state.password,
                "username": state.email,
            };
            const res = await sendDetailsSignup(payload)
            setError(res)
            redirectToLogin()
            } else {
                setError('Please enter valid username and password')
            };
    };
    const handleSubmit = () => state.password === state.confirmPassword ? sendDetailsToServer() : setError('Passwords do not match');
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
            <div className="alert alert-danger mt-1" style={{ display: error ? 'block' : 'none' }} role="alert">
                {error}
            </div>
            <div className="form-already">
                <span>Already have an account? </span>
                <span className="login-here" onClick={redirectToLogin}>Login here</span>
            </div>
        </div>
    );
};

export default withRouter(SignUp);