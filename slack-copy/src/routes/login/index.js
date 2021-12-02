import React from 'react';
import { withRouter } from 'react-router';
import LoginContainer from '../../components/LogIn/LoginContainer';


function Login(){
    return (
        <LoginContainer />
    )
}

export default withRouter(Login)