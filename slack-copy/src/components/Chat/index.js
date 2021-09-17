import axios from "axios";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants";

function Chat (props) {
    useEffect(() => {
        axios.get(API_BASE_URL+"/user/me", { headers: { "token" : localStorage.get(ACCESS_TOKEN_NAME)}})
        .then(function (res) {
            if(res.status !== 200){
                redirectToLogin()
            }
        })
        .catch(function(err){
            redirectToLogin()
        })
    })
    function redirectToLogin(){
        props.history.push('/login')
    }
}

export default withRouter(Chat)