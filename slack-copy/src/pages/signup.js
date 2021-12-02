import React from "react";
import { withRouter } from "react-router";
import SignupContainer from "../components/SignUp/SignupContainer";

function Signup(props) {
    const history = props.history
    return (
        <SignupContainer
            history={history} 
        />
    )
}

export default withRouter(Signup);