import React, { useState } from 'react';
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/index';
import { withRouter } from 'react-router';
import './Signup.css'

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
            console.log(API_BASE_URL)
            axios.post(API_BASE_URL + "/user", payload)
                .then(function (response) {
                    console.log(response.status)
                    if (response.status === 200) {
                        console.log('succes with response:', response)
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
        <div className="-flex flex-column card col-12 login-card hv-center">
            <form className="form-signup">
                <div className="form-part">
                    <label className="form-label" htmlFor="exampleInputEmail1">Email address</label>
                    <input className="form-input" type="email"

                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
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
                        placeholder="Password"
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
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="button"
                    className="d-flex w-50 justify-content-center align-self-center btn btn-primary"
                    onClick={handleSubmit}
                >
                    Click Me!
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Already have an account? </span>
                <span className="loginText" onClick={redirectToLogin}>Login here</span>
            </div>
        </div>
    );
}

export default withRouter(SignUp)