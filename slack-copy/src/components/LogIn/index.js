import React, { useState } from 'react';
import { withRouter } from 'react-router';
import LoginForm from './Form';
import SendLoginDetails from '../../services/api/sendDetailsLogin';

function LogIn(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null)
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
    const sendDetailsToServer = async () => {
        if (state.email.length && state.password.length) {
            const payload = {
                "email": state.email,
                "password": state.password,
            };
         const res = await SendLoginDetails(payload);
         if ( res === null) redirectToChat();
         setError(res);
        } else {
            setError('Please enter valid username and password');
        };
    };
    const handleSubmit = (e) => {
        sendDetailsToServer();
    };
    return (
        <div id="login" className="auth-container" >
            <img className="logo" alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" />
            <h2 className="greeting">Log in</h2>
            <LoginForm 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                email={state.email} 
                password={state.password} />
            <div className="alert alert-danger mt-1" style={{ display: error ? 'block' : 'none' }} role="alert">
                {error}
            </div>
            <div className="form-already">
                <span>Don't have an account? </span>
                <span className="login-here" onClick={() => redirectToSignUp()}>Register</span>
            </div>
        </div>
    );
};
export default withRouter(LogIn)