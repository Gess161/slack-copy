import LogIn from '.';
import { useState } from 'react';
import SendLoginDetails from '../../services/api/sendDetailsLogin';

export default function LoginContainer(props) {
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
         if ( res === null ) redirectToChat();
         setError(res);
        } else {
            setError('Please enter valid username and password');
        };
    };
    const handleSubmit = (e) => {
        console.log('i worked')
        sendDetailsToServer();
    };
    return (
        <LogIn 
            state={state}
            error={error}
            redirectToSignUp={redirectToSignUp}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}