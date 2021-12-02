import React from "react";
import { withRouter } from "react-router";
import SignupContainer from "../../components/SignUp/SignupContainer";


function Signup(props) {
    return (
        <SignupContainer />
    )
}

export default withRouter(Signup);