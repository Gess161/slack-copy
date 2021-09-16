import React, {useState} from 'react';
import axios from 'axios'

const API_BASE_URL = 'some url'
const ACCESS_TOKEN_NAME = 'some name'

export default function SignUp(props) {
    const [state, setState] = useState({
        login: '',
        password: '',
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password,
            }
            axios.post(API_BASE_URL + '/user/register', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        // redirectToHome();
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
                <label htmlFor="exampleInputlogin1">Login</label>
                <input type="login" 
                       className="form-control" 
                       id="login" 
                       aria-describedby="loginHelp" 
                       placeholder="Enter login"
                />
                <small id="loginHelp" className="form-text text-muted">We'll never share your login with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
