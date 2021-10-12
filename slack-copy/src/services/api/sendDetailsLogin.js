import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants";

export default async function SendLoginDetails(payload) {
    const res = await axios.post(API_BASE_URL + "/user/login", payload)
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                return (null);
            } else if (response.status === 204) {
                return("Username or password does not match");
            } else {
                return("Username does not exists");
            } 
        })
        .catch(error => {
            return(error.response.data.errorMessage);
        });
        return res;
};