import React from 'react';
import { withRouter } from 'react-router';
import LoginContainer from '../../components/LogIn/LoginContainer';

function Login(props){
    const history = props.history
    return (
        <LoginContainer
            history={history}
        />
    )
}

export default withRouter(Login)