import React from 'react';
import LoginForm from './Form'

function LogIn(props) {
    const { state,  error, redirectToSignUp, handleChange,  handleSubmit } = props;
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
export default LogIn