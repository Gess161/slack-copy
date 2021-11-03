import React from 'react';
import SignUpForm from './Form';

function SignUp(props) {
    const { handleSubmit, handleChange, state, error, redirectToLogin } = props;
    console.log(state)
    return (
        <div className="auth-container">
            <img className="logo" alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" />
            <h2 className="greeting">Welcome to Slack!</h2>
            <SignUpForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                email={state.email}
                password={state.password}
                confirmPassword={state.confirmPassword} 
                />
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

export default SignUp;