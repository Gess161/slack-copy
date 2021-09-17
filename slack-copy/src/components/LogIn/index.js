import React, { useState } from 'react';
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants';
import { withRouter } from 'react-router';


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
    // const redirectToChat = () => {
    //     props.history.push('/chat');
    // }
    const redirectToSignUp = () => {
        props.history.push('/');
    }

    const sendDetailsToServer = () => {
        console.log('button works')
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password,
            }
            console.log('payload is', payload)
            axios.post(API_BASE_URL + '/user/login', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Authentification succesful. Logging in...'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        // redirectToChat !!!!();
                        console.log('redirecting to chat')
                        props.showError(null)
                    } else {
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError('Please enter valid username and password')
        }
    }

    const handleSubmit = (e) => {
        sendDetailsToServer()
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
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
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Click Me!
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Don't have an account? </span>
                <span className="registerText" onClick={redirectToSignUp}>Register</span>
            </div>
        </div>
    )
}

export default withRouter(LogIn)