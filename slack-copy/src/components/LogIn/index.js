import React, { useState } from 'react';
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants';
import { withRouter } from 'react-router';
import './Login.css'


function LogIn(props) {
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

    const redirectToSignUp = () => {
        props.updateTitle('Register')
        props.history.push('/');
    }

    const redirectToChat = () => {
        props.updateTitle('Welcome to Hlack')
        props.history.push('/chat')
    }

    const sendDetailsToServer = () => {
        console.log('my props', props)
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password,
            }
            axios.post(API_BASE_URL + "/user/login", payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            successMessage: 'Authentification succesful. Logging in...'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToChat()
                        props.showError(null)
                    } else if (response.code === 204) {
                        props.showError("Username or password does not match");
                    } else {
                        props.showError("Username does not exists")
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        } else {
            props.showError('Please enter valid username and password')
        }
    }

    const handleSubmit = (e) => {
        sendDetailsToServer()
    }
    return (
        <div className="d-flex card h-100 col-12 login-card hv-center" >
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                <small id="passwordHelp" className="form-text text-muted">Password must contain at least 6 characters</small>
                </div>
                <button
                    type="button"
                    className="m-2 btn btn-primary"
                    onClick={handleSubmit}
                >
                    Click Me!
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Don't have an account? </span>
                <span className="loginText" onClick={() => redirectToSignUp()}>Register</span>
            </div>
        </div>
    )
}

export default withRouter(LogIn)