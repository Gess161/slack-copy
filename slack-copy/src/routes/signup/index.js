import React, {useState} from "react";
import { withRouter } from "react-router";
import SignUp from "../../components/SignUp";
import sendDetailsSignup from "../../services/api/sendSignupDetails"

function Signup(props) {
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
        if (state.email.length && state.password.length >= 6) {
            const payload = {
                "email": state.email,
                "password": state.password,
                "username": state.email,
            };
            const res = await sendDetailsSignup(payload)
            setError(res)
            if(res === null){
                redirectToLogin()
            }
        } else {
            setError('Please enter valid username and password')
        };
    };
    const handleSubmit = () => state.password === state.confirmPassword ? sendDetailsToServer() : setError('Passwords do not match');
    return (
        <SignUp
            redirectToLogin={redirectToLogin}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            state={state}
            error={error}
        />
    )
}

export default withRouter(Signup);