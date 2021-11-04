import React from 'react';
import SignUpForm from './Form';

function SignUp(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }


    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }

    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            const payload = {
                "email": state.email,
                "password": state.password,
            }
            axios.post(API_BASE_URL + "/user", payload)
                .then(response => {
                    console.log(response.status)
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            successMessage: 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToLogin();
                    } 
                })
                .catch( error => {
                    props.showError(error.response.data.errorMessage)
                });
        } else {
            props.showError('Please enter valid username and password')
        }
    }

    const handleSubmit = () => {
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match')
        };
    }

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