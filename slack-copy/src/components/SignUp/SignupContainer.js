import SignUp from ".";
import { useState } from "react";
import sendDetailsSignup from "../../services/api/sendSignupDetails";

export default function SignupContainer (props){
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
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            state={state}
            error={error}
            redirectToLogin={redirectToLogin} 
        />
    )
}